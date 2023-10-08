'use client'
import axios from "axios";
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'

import useRegisterModal from "../../hooks/useRegisterModal";

import Modal from "./Modal";
import { Heading } from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { Separator } from "@/components/ui/separator";


const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(false)
        axios.post('api/register', data)
            .then(() => {
                registerModal.onClose()
            })
            .catch((error) => {
                toast.error('Something went wrong!')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to PickUp"
                subtitle="Make a user profile!"
                center />
            <Input
                id="username"
                label="Username"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Separator />
            <Input
                id="location"
                label="Location"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            
            <div className="
            text-neutral-800
            mt-4
            font-light">
                <div className="justify-center flex flex-grow items-center gap-2">

                    <div className="cursor-pointer hover:underline"
                        onClick={registerModal.onClose} >
                        Already have an account?

                    </div>

                </div>
            </div>

        </div>

    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
};

export default RegisterModal