import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authActions } from "../actions/authActions";

const authApi = createApi({
  reducerPath: "User",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}${version}-users`,
  }),
  tagtype: ["User"],
  refetchOnReconnect: true,
  endpoints(builder) {
    return {
      signupUser: builder.mutation({
        query: ({
          firstName,
          lastName,
          phoneNumber,
          password,
          countryCode,
          device_data,
          recaptchaResponse,
        }) => {
          const formData = new FormData();
          formData.append("firstName", firstName);
          formData.append("lastName", lastName);
          formData.append("number", phoneNumber);
          formData.append("user_password", password);
          formData.append("recaptcha", recaptchaResponse);
          formData.append("countryCode", countryCode);
          formData.append("device_data", device_data);
          formData.append("is_web", true);
          return {
            url: "/sign-up",
            method: "post",
            body: formData,
          };
        },
      }),
      signinUser: builder.mutation({
        query: ({
          countryCode,
          phone,
          password,
          device_data,
          recaptchaResponse,
          isWeb,
        }) => {
          const formData = new FormData();
          formData.append("number", phone);
          formData.append("countryCode", countryCode);
          formData.append("password", password);
          formData.append("recaptcha", recaptchaResponse);
          formData.append("device_data", device_data);
          formData.append("is_web", isWeb ?? true);
          return {
            url: "/sign-in",
            method: "post",
            body: formData,
          };
        },
      }),
      autoLoginUser: builder.query({
        query: ({ token }) => {
          const formData = new FormData();
          if (token && token !== "null" && token !== "undefined") {
            formData.append("token", token);
          } else {
            formData.append("token", "");
          }
          return {
            url: "/auto-login",
            method: "post",
            body: formData,
          };
        },
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled;
          if (data) {
            if (data?.succeeded) {
              dispatch(
                authActions.login({
                  user: data.user,
                  token: data.token,
                  rememberMe: false,
                })
              );
            }
          }
        },
        providesTags: (result) => {
          if (result && result.user) {
            if (Array.isArray(result.user)) {
              return [
                ...result?.user?.map(({ id }) => ({ type: "User", id })),
                { type: "User", id: "LIST" },
              ];
            } else {
              return [
                { type: "User", id: result.user.id },
                { type: "User", id: "LIST" },
              ];
            }
          } else {
            return [{ type: "User", id: "LIST" }];
          }
        },
      }),
    };
  },
});

export const {
  useSignupUserMutation,
  useSigninUserMutation,
  useAutoLoginUserQuery,
} = authApi;
export default authApi;
