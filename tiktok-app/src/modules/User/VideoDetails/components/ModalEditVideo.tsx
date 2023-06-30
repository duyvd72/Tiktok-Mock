import { Formik, Field, Form } from 'formik'
import React, { useState } from 'react'
import { updateVideo } from '@/api/videoAPIs'
import LoadingSpinner from '@/components/LoadingSpinner'

interface IModalEditVideo {
    titleVideo: string,
    hashtagVideo: string,
    setOpenModal: (value: boolean) => void
    setHashTagVideo: React.Dispatch<React.SetStateAction<string | undefined>>
    setTitleVideo: React.Dispatch<React.SetStateAction<string | undefined>>
    videoId: string
    refetch: () => void;
}
interface IVideosValues {
    titleVideo: string,
    hashtagVideo: string,
}

const ModalEditVideo: React.FC<IModalEditVideo> = ({ titleVideo = '', hashtagVideo = '', setOpenModal, videoId, setHashTagVideo, setTitleVideo, refetch }) => {

    const [isLoading, setIsLoading] = useState(false)
    const initialValues = {
        titleVideo,
        hashtagVideo
    };

    const onHandleSubmit = async (values: IVideosValues) => {
        setIsLoading(true)
        const response = await updateVideo(videoId, values)
        setHashTagVideo(response.videoHashtag)
        setTitleVideo(response.videoTitle)
        setIsLoading(false)
        setOpenModal(false)
        refetch();
    };

    return (
        <main
            className={`absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] 
            h-[400px] w-[400px] bg-stone-500 rounded-md p-5`}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => onHandleSubmit(values)}
            >
                {({ values }) => (
                    <Form className='flex flex-col relative h-full w-full'>
                        <label className='font-bold cursor-pointer text-white' htmlFor='title'>TitleVideo</label>
                        <Field id='title' type="text" as="textarea" name="titleVideo" className="my-3 p-2 " />
                        <label htmlFor='hashtag cursor-pointer ' className='font-bold text-white' >HashTagVideo</label>
                        <Field id='hashtag' type="text" as="textarea" name="hashtagVideo" className="my-3 p-2" />
                        <article>
                            <button type='button' onClick={() => {
                                if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
                                    if (confirm('Are you sure to cancel?')) {
                                        setOpenModal(false)
                                    }
                                } else {
                                    setOpenModal(false)
                                }
                            }} className='bg-red-500 text-white font-bold rounded-md p-2 min-w-[100px] me-5'>Cancel</button>
                            <button type='submit' className={`bg-gray-400 p-2 text-white font-bold rounded-md min-w-[100px] min-h-[40px] relative ${isLoading ? 'bottom-1 ' : ''} `}>
                                {isLoading ? <LoadingSpinner className='absolute right-[50%] top-[0] -translate-x-[-50%]' /> : 'Sửa'}
                            </button>
                        </article>
                    </Form>
                )}
            </Formik>
        </main>
    )
}

export default ModalEditVideo