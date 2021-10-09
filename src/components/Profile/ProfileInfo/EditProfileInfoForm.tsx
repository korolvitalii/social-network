import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ContactsType, ProfileType } from '../../../types/types';
import { undateUserProfileInfo } from '../../../redux/actions/ProfileActions';
import { prepareErrors } from '../../../helpers/helpers';
import classes from './EditProfileInfoForm.module.css';
import { useDispatch } from 'react-redux';

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
  const onSubmit: SubmitHandler<ProfileType> = (data) => {
    const updateData = { data: { userId: userId }, ...data };
    dispatch(undateUserProfileInfo(updateData));
    dispatch(goToEditMode(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <b>Fullname: </b>
        <input {...register('fullName', { required: true })} defaultValue={fullName || undefined} />
      </div>
      <div>
        {errors.fullName?.type === 'server' && (
          <span className={classes.errors}>{errors.fullName.message}</span>
        )}
        {errors.fullName && <span className={classes.errors}>This field is required</span>}
      </div>
      <div>
        <b>Looking for a job:</b>
        <input
          type='checkbox'
          {...register('lookingForAJob', { required: true })}
          defaultChecked={lookingForAJob || undefined}
        />
      </div>
      <div>
        {errors.lookingForAJob && (
          <span className={classes.errors}>{errors.lookingForAJob.message}</span>
        )}
      </div>
      <div>
        <b>My professional skills:</b>
        <textarea
          {...register('lookingForAJobDescription', { required: true })}
          defaultValue={lookingForAJobDescription || undefined}
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
      <div>
        <b>About me</b>:
        <textarea
          {...register('aboutMe', { required: true })}
          defaultValue={aboutMe || undefined}
        />
      </div>
      <div>
        {errors.aboutMe && <span className={classes.errors}>This field is required</span>}
        {errors.aboutMe && <p>{errors.aboutMe.message}</p>}
      </div>
      <div>
        {contacts &&
          Object.keys(contacts).map((key) => {
            return (
              <div key={key}>
                <span>{key}</span>
                <input
                  {...register(`contacts.${key as keyof ContactsType}`)}
                  defaultValue={contacts[key as keyof ContactsType]}
                />
                {errors[key as keyof FormValuesType] && (
                  <p>{errors[key as keyof FormValuesType]}</p>
                  // <p>{errors[key as keyof FormValuesType]?.message}</p>
                )}
              </div>
            );
          })}
      </div>
      <input type='submit' />
    </form>
  );
};

export default EditProfileInfoForm;
