import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ContactsType, ProfileType } from '../../../types/types';
import { undateUserProfileInfo } from '../../../redux/actions/ProfileActions';
import { prepareErrors } from '../../../helpers/helpers';
import classes from './EditProfileInfoForm.module.css';

type PropsType = {
  handleButtonClick: any;
  editMode: boolean;
  userId?: number;
  formErrors: Array<string>;
  fullName: string;
  aboutMe: string;
  contacts: ContactsType;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
};

const EditProfileInfoForm: React.FC<PropsType> = ({
  userId,
  handleButtonClick,
  editMode,
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
  } = useForm<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    formErrors.map((error: string) => {
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
      return;
    });
  }, [formErrors, setError]);
  console.log(errors);
  const onSubmit: SubmitHandler<ProfileType> = (data) => {
    const updateData = { data: { userId: userId }, ...data };
    dispatch(undateUserProfileInfo(updateData));
    handleButtonClick(editMode);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <b>Fullname: </b>
        <input {...register('fullName', { required: true })} defaultValue={fullName} />
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
          defaultChecked={lookingForAJob}
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
          defaultValue={lookingForAJobDescription}
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
        <textarea {...register('aboutMe', { required: true })} defaultValue={aboutMe} />
      </div>
      <div>
        {errors.aboutMe && <span className={classes.errors}>This field is required</span>}
        {errors.aboutMe && <p>{errors.aboutMe.message}</p>}
      </div>
      <div>
        {contacts &&
          Object.keys(contacts).map((contact) => {
            return (
              <div key={contact}>
                <span>{contact}</span>
                <input
                  {...register(`contacts.${contact}`)}
                  defaultValue={contacts[contact as keyof ContactsType]}
                />
                {errors[contact] && <p>{errors[contact].message}</p>}
              </div>
            );
          })}
      </div>
      <input type='submit' />
    </form>
  );
};

export default EditProfileInfoForm;
