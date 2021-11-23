import { Button, TextField } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { prepareErrors } from '../../../helpers/helpers';
import {
  getUserProfile,
  undateUserProfileInfo,
  uploadUserPhoto
} from '../../../redux/actions/ProfileActions';
import { ContactsType, ProfileType } from '../../../types/types';
import {
  EditProfileWrapper,
  FormItems, SaveButton, SavePhotoBlock,
  ShowErrorText
} from './EditProfileInfoForm.styled';

type PropsType = {
  goToEditMode: (editMode: boolean) => void;
  userId?: number | null;
  formErrors: Array<string> | null;
  fullName?: string | null;
  aboutMe?: string | null;
  contacts?: ContactsType | null;
  lookingForAJob?: boolean | null;
  lookingForAJobDescription?: string | null;
};

type FormValuesType = {
  formErrors: Array<string>;
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  contacts: ContactsType;
};

const EditProfileInfoForm: React.FC<PropsType> = ({
  userId,
  goToEditMode,
  formErrors,
  fullName,
  aboutMe,
  contacts,
  lookingForAJob,
  lookingForAJobDescription,
}): React.ReactElement => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormValuesType>();
  const dispatch = useDispatch();
  useEffect(() => {
    formErrors?.forEach((error: string) => {
      if (error.includes('Contacts')) {
        const errorTypeCapitalize = prepareErrors(error, 'Contacts->');
        setError(errorTypeCapitalize, {
          type: 'server',
          message: error,
        });
      }
      const errorTypeCapitalize = prepareErrors(error, ' (');
      setError(errorTypeCapitalize, {
        type: 'server',
        message: error,
      });
    });
  }, [formErrors, setError]);

  const { ref, ...inputProps } = register('aboutMe', {
    required: 'Required',
  });

  const onSubmit: SubmitHandler<ProfileType> = (data) => {
    const updateData = { data: { userId: userId }, ...data };
    dispatch(undateUserProfileInfo(updateData));
    dispatch(goToEditMode(false));
    if (userId) {
      dispatch(getUserProfile(userId));
    }
  };

  const savePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      dispatch(uploadUserPhoto(e.target.files[0]));
    }
  };

  return (
    <EditProfileWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormItems>
          <Controller
            name='fullName'
            control={control}
            defaultValue={fullName || undefined}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id='outlined-basic'
                label='Fullname'
                variant='outlined'
                {...field}
                error={!!errors.fullName}
              />
            )}
          />
        </FormItems>
        <SavePhotoBlock>
          <input
            style={{ display: 'none' }}
            id='contained-button-file'
            type='file'
            onChange={savePhoto}
          />
          <label htmlFor='contained-button-file'>
            <Button variant='outlined'>Upload photo</Button>
          </label>
        </SavePhotoBlock>
        <div>
          {errors.fullName?.type === 'server' && (
            <ShowErrorText>{errors.fullName.message}</ShowErrorText>
          )}
          {errors.fullName && <ShowErrorText>This field is required</ShowErrorText>}
        </div>
        <FormItems>
          <b>Looking for a job:</b>
          <input
            type='checkbox'
            {...register('lookingForAJob')}
            defaultChecked={lookingForAJob || undefined}
          />
        </FormItems>
        <div>
          {errors.lookingForAJob && <ShowErrorText>{errors.lookingForAJob.message}</ShowErrorText>}
        </div>
        <FormItems>
          <Controller
            name='lookingForAJobDescription'
            control={control}
            defaultValue={lookingForAJobDescription || undefined}
            render={({ field }) => (
              <TextField id='outlined-basic' label='Skills' variant='outlined' {...field} />
            )}
          />
        </FormItems>
        <div>
          {errors.lookingForAJobDescription && (
            <ShowErrorText>This field is required</ShowErrorText>
          )}
          {errors.lookingForAJobDescription?.type === 'server' && (
            <ShowErrorText>{errors.lookingForAJobDescription.message}</ShowErrorText>
          )}
        </div>
        <FormItems>
          <Controller
            name='aboutMe'
            control={control}
            defaultValue={aboutMe || undefined}
            render={({ field }) => (
              <TextField
                inputRef={ref}
                {...inputProps}
                id='outlined-basic'
                label='About me'
                variant='outlined'
                {...field}
                error={!!errors.aboutMe}
              />
            )}
          />
        </FormItems>
        <div>
          {errors.aboutMe && <ShowErrorText>This field is required</ShowErrorText>}
          {errors.aboutMe && <p>{errors.aboutMe.message}</p>}
        </div>
        <div>
          {contacts &&
            Object.keys(contacts).map((key) => {
              console.log(errors[key as keyof FormValuesType]);
              return (
                <FormItems key={key}>
                  <Controller
                    name={`contacts.${key as keyof ContactsType}`}
                    control={control}
                    defaultValue={contacts[key as keyof ContactsType]}
                    render={({ field }) => (
                      <TextField id='outlined-basic' label={key} variant='outlined' {...field} />
                    )}
                  />

                  {errors[key as keyof FormValuesType] && (
                    <>{<p>{errors[key as keyof FormValuesType]}</p>}</>
                  )}
                </FormItems>
              );
            })}
        </div>
        <SaveButton type='submit' variant='outlined'>
          Save
        </SaveButton>
      </form>
    </EditProfileWrapper>
  );
};

export default EditProfileInfoForm;
