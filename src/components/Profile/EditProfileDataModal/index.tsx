import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { prepareErrors } from '../../../helpers/helpers';
import {
  getUserProfile,
  undateUserProfileInfo,
  uploadUserPhoto,
} from '../../../redux/actions/ProfileActions';
import { ContactsType, ProfileType } from '../../../types/types';
import { Wrapper } from './styles';

interface EditProfileInfoFormProps {
  goToEditMode: (editMode: boolean) => void;
  userId?: number | null;
  formErrors: Array<string> | null;
  fullName?: string | null;
  aboutMe?: string | null;
  contacts?: ContactsType | null;
  lookingForAJob?: boolean | null;
  lookingForAJobDescription?: string | null;
}

interface FormValuesInterface {
  formErrors: Array<string>;
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  contacts: ContactsType;
}

const EditProfileInfoForm: React.FC<EditProfileInfoFormProps> = ({
  userId,
  goToEditMode,
  formErrors,
  fullName,
  aboutMe,
  contacts,
  lookingForAJob,
  lookingForAJobDescription,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<FormValuesInterface>();
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
    console.log(e);
    if (e.target.files && e.target.files.length) {
      dispatch(uploadUserPhoto(e.target.files[0]));
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-item'>
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
        </div>
        <div className='form-item'>
          <input id='file' type='file' onChange={savePhoto} />
          {/* <label htmlFor='file'>
            <button>Upload photo</button>
          </label> */}
        </div>
        <div>
          {errors.fullName?.type === 'server' && (
            <span className='text-red'>{errors.fullName.message}</span>
          )}
          {errors.fullName && <span className='text-red'>This field is required</span>}
        </div>
        <div className='form-item'>
          <b>Looking for a job:</b>
          <input
            type='checkbox'
            {...register('lookingForAJob')}
            defaultChecked={lookingForAJob || undefined}
          />
        </div>
        <div>
          {errors.lookingForAJob && (
            <span className='text-red'>{errors.lookingForAJob.message}</span>
          )}
        </div>
        <div className='form-item'>
          <Controller
            name='lookingForAJobDescription'
            control={control}
            defaultValue={lookingForAJobDescription || undefined}
            render={({ field }) => (
              <TextField id='outlined-basic' label='Skills' variant='outlined' {...field} />
            )}
          />
        </div>
        <div>
          {errors.lookingForAJobDescription && (
            <span className='text-red'>This field is required</span>
          )}
          {errors.lookingForAJobDescription?.type === 'server' && (
            <span className='text-red'>{errors.lookingForAJobDescription.message}</span>
          )}
        </div>
        <div className='form-item'>
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
        </div>
        <div>
          {errors.aboutMe && <span className='text-red'>This field is required</span>}
          {errors.aboutMe && <p>{errors.aboutMe.message}</p>}
        </div>
        <div>
          {contacts &&
            Object.keys(contacts).map((key) => {
              return (
                <div key={key} className='form-item'>
                  <Controller
                    name={`contacts.${key as keyof ContactsType}`}
                    control={control}
                    defaultValue={contacts[key as keyof ContactsType]}
                    render={({ field }) => (
                      <TextField id='outlined-basic' label={key} variant='outlined' {...field} />
                    )}
                  />

                  {errors[key as keyof FormValuesInterface] && (
                    <>{<p>{errors[key as keyof FormValuesInterface]}</p>}</>
                  )}
                </div>
              );
            })}
        </div>
        <Button className='save-button' type='submit' variant='outlined'>
          Save
        </Button>
      </form>
    </Wrapper>
  );
};

export default EditProfileInfoForm;
