import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
import { $api } from '@/shared/api/api';
import { ComponentRender } from '@/shared/lib/tests/ComponentRender/ComponentRender';

import { EditableProfileCard } from './EditableProfileCard';
import { profileReducer } from '../../model/slice/profileSlice';

const profile: Profile = {
  id: '1',
  first: 'John',
  lastname: 'Doe',
  birthYear: 1990,
  currency: Currency.USD,
  country: Country.KAZ,
  city: 'Moscow',
  username: 'JohnDoe',
};

const options = {
  initialState: {
    user: {
      authData: {
        id: '1',
      },
    },
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('features/EditableProfileCard', () => {
  beforeEach(() => {
    ComponentRender(
      <EditableProfileCard id="1" />,
      options,
    );
  });

  test('switch readonly mode', async () => {
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
  });

  test('reset values with cancel button click', async () => {
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'test');
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'test');

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('test');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('test');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue(profile.first);
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue(profile.lastname);
  });

  test('validation error', async () => {
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(screen.getByTestId('EditableProfileCard.Error.Body')).toBeInTheDocument();
  });

  test('if no validation error, send PUT request on server', async () => {
    const mockPutRequest = jest.spyOn($api, 'put');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'test');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(mockPutRequest).toBeCalled();
  });
});
