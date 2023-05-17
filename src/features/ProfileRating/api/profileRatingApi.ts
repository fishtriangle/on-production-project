import { rtkApi } from '@/shared/api/rtkApi';
import { Rating } from '@/entities/Rating';

interface GetProfileRatingsArgs {
  userId: string;
  profileId: string;
}

interface RateProfileArgs {
  userId: string;
  profileId: string;
  rate: number;
  feedback?: string;
}

const profileRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileRatings: build.query<Rating[], GetProfileRatingsArgs>({
      query: ({ userId, profileId }) => ({
        url: '/profile-ratings',
        params: {
          userId,
          profileId,
        },
      }),
    }),
    rateProfile: build.mutation<void, RateProfileArgs>({
      query: (args) => ({
        url: '/profile-ratings',
        method: 'POST',
        body: args,
      }),
    }),
  }),
});

export const { useGetProfileRatingsQuery } = profileRatingApi;
export const { useRateProfileMutation } = profileRatingApi;
