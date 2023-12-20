import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getToken = () => {
  let getToken = localStorage.getItem('token') || [];
  return getToken ? getToken : null;
};

export const usersApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4500',
    prepareHeaders: (headers) => {
      const token = getToken();

      if (token) {
        headers.set('Authorization', `${token}`);
      }
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
      providesTags: ['User'], // Invalidation tag
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: '/user/register',
        method: 'POST',
        body: credentials,
      }),
      providesTags: ['User'], // Invalidation tag
    }),
    tagTypes: ['User'],
    sendOtp: builder.mutation({
      query: (credentials) => ({
        url: '/user/send-otp',
        method: 'POST',
        body: credentials,
      }),
      providesTags: ['User'], // Invalidation tag
    }),
    tagTypes: ['User'],

    handleForgetPassword: builder.mutation({
      query: (body) => ({
        url: '/user/forgetPassword',
        method: 'POST',
        body,
      }),
      providesTags: ['User'],
      tagTypes: ['User'],
    }),
    handleForgetPasswordOtpVerify: builder.mutation({
      query: (body) => ({
        url: 'user/verifyOtp',
        method: 'POST',
        body,
      }),
    }),
    setNewPassword: builder.mutation({
      query: (body) => ({
        url: 'user/resetpassword',
        method: 'POST',
        body,
      }),
    }),
    handleTwofactorAuth: builder.mutation({
      query: (body) => ({
        url: 'user/twoFactorAuth/getSecertKey',
        method: 'POST',
        body,
      }),
    }),
    twoFactorverifySecretCode: builder.mutation({
      query: (body) => ({
        url: 'user/twoFactorAuth/verifySecret',
        method: 'POST',
        body,
      }),
    }),
    twoFactorDisable: builder.mutation({
      query: (body) => ({
        url: 'user/twoFactorAuth/disableAuthCode',
        method: 'POST',
        body,
      }),
    }),
    getProfileDetails: builder.mutation({
      query: (body) => ({
        url: 'user/Userdetails',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    profileDetailsUpdate: builder.mutation({
      query: (formData) => ({
        url: 'user/Imageupload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    changePasswordUpdate: builder.mutation({
      query: (formData) => ({
        url: 'user/Changepassword',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    kycVerifiedUpdate: builder.mutation({
      query: (body) => ({
        url: 'user/kycupload',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    fetchKycData: builder.mutation({
      query: (body) => ({
        url: 'user/kycfetching',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    addBankDetails: builder.mutation({
      query: (body) => ({
        url: 'user/Add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    fetchBankDetails: builder.mutation({
      query: (body) => ({
        url: 'user/Addfetching',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),

    addContactDetails: builder.mutation({
      query: (body) => ({
        url: 'user/contactus',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    getDeposit: builder.query({
      query: (id) => ({
        url: `user/get-deposit/${id}`,
        method: 'GET',
      }),
    }),
    depositAmount: builder.mutation({
      query: (body) => ({
        url: 'user/deposit',
        method: 'POST',
        body,
      }),
    }),
    getContent: builder.query({
      query: () => 'admin/content/getcontents',
      providesTags: [{ type: 'Admin', id: 'Contents' }],
    }),
    getTradeHistory: builder.query({
      query: (id) => ({
        url: `user/get-trade/${id}`,
        method: 'GET',
      }),
    }),
    startTrade: builder.mutation({
      query: (body) => ({
        url: 'user/trade',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetTradeHistoryQuery,
  useStartTradeMutation,
  useGetDepositQuery,
  useDepositAmountMutation,

  useGetContentQuery,
  useRegisterMutation,
  useLoginMutation,
  useSendOtpMutation,
  useHandleForgetPasswordMutation,
  useHandleForgetPasswordOtpVerifyMutation,
  useSetNewPasswordMutation,
  useHandleTwofactorAuthMutation,
  useTwoFactorverifySecretCodeMutation,
  useTwoFactorDisableMutation,
  useGetProfileDetailsMutation,
  useProfileDetailsUpdateMutation,
  useKycVerifiedUpdateMutation,
  useFetchKycDataMutation,
  useAddBankDetailsMutation,
  useFetchBankDetailsMutation,
  useChangePasswordUpdateMutation,
  useAddContactDetailsMutation,
} = usersApi;
