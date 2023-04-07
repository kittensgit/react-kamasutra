import React from "react";
import { Formik, Field, Form } from "formik";
import s from './ProfileInfo.module.css';

const ProfileDataForm = ({ saveProfile, profile, setEditMode }) => {

    let contacts = profile.contacts

    return (

        <Formik
            initialValues={
                {
                fullName: profile.fullName,
                lookingForAJob: profile.lookingForAJob,
                lookingForAJobDescription: profile.lookingForAJobDescription,
                aboutMe: profile.aboutMe,
                contacts: {
                    github: contacts.github,
                    vk: contacts.vk,
                    facebook: contacts.facebook,
                    instagram: contacts.instagram,
                    twitter: contacts.twitter,
                    website: contacts.website,
                    youtube: contacts.youtube,
                    mainLink: contacts.mainLink
                }
            }}
            onSubmit={(values) => {
                saveProfile(values)
                setEditMode(false)
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <button type={'submit'}>save</button>
                    <div>
                        <b>Full name: </b>
                        <div>
                            <Field type={'text'} name={'fullName'} placeholder={'Full name'} />
                        </div>
                    </div>
                    <div>
                        <b>Looking for a job:</b>
                        <div>
                            <Field type={'checkbox'} name={'lookingForAJob'} />
                        </div>
                    </div>
                    <div>
                        <b>My professional skills: </b>
                        <div>
                            <Field as='textarea' name={'lookingForAJobDescription'} placeholder='My professional skills' />
                        </div>
                    </div>
                    <div>
                        <b>About me: </b>
                        <div>
                            <Field as='textarea' name={'aboutMe'} placeholder='About me' />
                        </div>
                    </div>

                    <div>
                        <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                            return <div key={key} className={s.contact}>
                                <b>{key}:
                                    {<Field type={'text'} name={'contacts.' + key} placeholder={key} />}
                                </b>
                            </div>
                        })}
                    </div>
                </Form>
            )}
        </Formik>



    )
}

export default ProfileDataForm;