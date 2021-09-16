import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ContactsType, ProfileType } from '../../../types/types';
import { undateUserProfileInfo } from '../../../redux/actions/ProfileActions';

type PropsType = {
  handleButtonClick: any;
  editMode: boolean;
  userId?: number;
};

const EditProfileInfoForm: React.FC<PropsType> = ({ userId, handleButtonClick, editMode }) => {
  const { register, handleSubmit } = useForm<Partial<ProfileType>>();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<ProfileType> = (data) => {
    handleButtonClick(editMode);
    const updateData = { data: { userId: userId }, ...data };
    dispatch(undateUserProfileInfo(updateData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <b>Fullname: </b>
        <input {...register('fullName')} />
      </div>
      <div>
        <b>Looking for a job:</b>
        <input type='checkbox' placeholder='asdasd' {...register('lookingForAJob')} />
      </div>
      <div>
        <b>My professional skills:</b>
        <textarea {...register('lookingForAJobDescription', {})} />
      </div>
      <div>
        <b>About me</b>:
        <textarea {...register('aboutMe', {})} />{' '}
      </div>
      <div>
        <span>Facebook: </span>
        <input {...register('contacts.facebook')} />
      </div>
      <div>
        <span>Website: </span>
        <input {...register('contacts.website')} />
      </div>
      <div>
        <span>Vk: </span>
        <input {...register('contacts.vk')} />
      </div>
      <div>
        <span>Twitter: </span>
        <input {...register('contacts.twitter')} />
      </div>
      <div>
        <span>Instagram: </span>
        <input {...register('contacts.instagram')} />
      </div>
      <div>
        <span>Youtube: </span>
        <input {...register('contacts.youtube')} />
      </div>
      <div>
        <span>Github: </span>
        <input {...register('contacts.github')} />
      </div>
      <div>
        <span>Main link</span>
        <input {...register('contacts.mainLink')} />
      </div>
      <input type='submit' />
    </form>
  );
};

export default EditProfileInfoForm;
