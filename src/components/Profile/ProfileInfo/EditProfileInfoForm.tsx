import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ContactsType, ProfileType } from '../../../types/types';
import { undateUserProfileInfo } from '../../../redux/actions/ProfileActions';
import { prepareErrors } from '../../../helpers/helpers';
import classes from './EditProfileInfoForm.module.css';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@mui/material';

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
}) => {
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
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formChildren}>
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
      <div>
        {errors.fullName?.type === 'server' && (
          <span className={classes.errors}>{errors.fullName.message}</span>
        )}
        {errors.fullName && <span className={classes.errors}>This field is required</span>}
      </div>
      <div className={classes.formChildren}>
        <b>Looking for a job:</b>
        <input
          type='checkbox'
          {...register('lookingForAJob')}
          defaultChecked={lookingForAJob || undefined}
        />
      </div>
      <div>
        {errors.lookingForAJob && (
          <span className={classes.errors}>{errors.lookingForAJob.message}</span>
        )}
      </div>
      <div className={classes.formChildren}>
        <Controller
          name='lookingForAJobDescription'
          control={control}
          defaultValue={lookingForAJobDescription || undefined}
          render={({ field }) => (
            <TextField
              id='outlined-basic'
              label='lookingForAJobDescription'
              variant='outlined'
              {...field}
            />
          )}
        />
      </div>
      <div>
        {errors.lookingForAJobDescription && (
          <span className={classes.errors}>This field is required</span>
        )}
        {errors.lookingForAJobDescription?.type === 'server' && (
          <span className={classes.errors}>{errors.lookingForAJobDescription.message}</span>
        )}
      </div>
      <div className={classes.formChildren}>
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
        {errors.aboutMe && <span className={classes.errors}>This field is required</span>}
        {errors.aboutMe && <p>{errors.aboutMe.message}</p>}
      </div>
      <div>
        {contacts &&
          Object.keys(contacts).map((key) => {
            console.log(errors[key as keyof FormValuesType]);
            return (
              <div key={key} className={classes.formChildren}>
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
              </div>
            );
          })}
      </div>
      <Button variant='contained' type='submit' className={classes.formSubmit}>
        Save
      </Button>
    </form>
  );
};

export default EditProfileInfoForm;
