import { api } from '../service_admin/api_admin'

const token = localStorage.getItem('token')
const fetchingAdminData = api.injectEndpoints({
  endpoints: (builder) => ({
    adminloginData: builder.mutation({
      query: (body) => ({
        url: '/admin/adminlogin',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Task'],
    }),

    getTwoFactorAuthentication: builder.mutation({
      query: (body) => ({
        url: 'admin/adminlogin/twoFactorGetCode',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    twoFactorVerify: builder.mutation({
      query: (body) => ({
        url: 'admin/adminlogin/twoFactorVerify',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    disableTwoFactorVerify: builder.mutation({
      query: (body) => ({
        url: 'admin/adminlogin/disableTwoFactor',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),

    // userregiterData: builder.query({
    //     query: () => ({
    //         headers:{
    //             Authorization:`Bearer ${token}`
    //         },
    //         method: 'GET',
    //         url:'/admin/registerlist'
    //     }),
    //     providesTags: ['Task'], }),

    adminchangepasswordData: builder.mutation({
      query: (body) => ({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: '/admin/changepassword',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Task'],
    }),

    oldPattern: builder.mutation({
      query: (body) => ({
        url: 'admin/oldPattern',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Task'],
    }),
    newPattern: builder.mutation({
      query: (body) => ({
        url: 'admin/newPattern',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Task'],
    }),
    forgetPasswordVerifymail: builder.mutation({
      query: (body) => ({
        url: 'admin/forgetPassword/verifyEmail',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Task'],
    }),
    loginTwoFactorVerify: builder.mutation({
      query: (body) => ({
        url: 'admin/login/loginTwoFactorVerify',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    setNewPassword: builder.mutation({
      query: (body) => ({
        url: 'admin/setpassword',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Task'],
    }),
    setNewPattern: builder.mutation({
      query: (body) => ({
        url: 'admin/setpattern',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Task'],
    }),
    addContent: builder.mutation({
      query: (contentData) => ({
        url: 'admin/contents',
        method: 'POST',
        body: contentData,
      }),
      providesTags: (result, error, contentData) => [{ type: 'Admin', id: 'Contents' }],

      invalidatesTags: [{ type: 'Admin', id: 'Contents' }],
    }),
    getContent: builder.query({
      query: () => 'admin/content/getcontents',
      providesTags: [{ type: 'Admin', id: 'Contents' }],
    }),
    getContentByID: builder.query({
      query: (id) => `admin/content/getcontent/${id}`,
      providesTags: [{ type: 'Admin', id: 'Contents' }],
    }),
    updateContentById: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `admin/content/updatecontent/${id}`,
        method: 'POST',
        body: { updatedData },
      }),
      invalidatesTags: [{ type: 'Admin', id: 'Contents' }],
    }),
  }),
})
export const {
  useGetContentQuery,
  useGetContentByIDQuery,
  useUpdateContentByIdMutation,

  useUserregiterDataQuery,
  useAdminloginDataMutation,
  useGetTwoFactorAuthenticationMutation,
  useTwoFactorVerifyMutation,
  useDisableTwoFactorVerifyMutation,
  useAdminchangepasswordDataMutation,
  useOldPatternMutation,
  useNewPatternMutation,
  useForgetPasswordVerifymailMutation,
  useLoginTwoFactorVerifyMutation,
  useSetNewPasswordMutation,
  useSetNewPatternMutation,
} = fetchingAdminData
