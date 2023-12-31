'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Input from "../Input";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Heading } from "../Heading";
import { Switch } from "@/components/ui/switch";
import Button from "../Button";
import axios from "axios";
import router from "next/router";
import toast from "react-hot-toast";

export default function CreateGame() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      game: '',
      location: '',
      game_type: '',
      public: 'True',
      passsword: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    setIsLoading(true);

    axios.post('http://localhost:5000/api/create_game', formData)
      .then(() => {
        router.push('/');
      })
      .catch((_error) => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="h-screen flex justify-center gap-12 items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Game</CardTitle>
          <CardDescription>Customize your pickup game!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="game_name"
                  id="game_name"
                  label="Game"
                  type="string"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  name="location"
                  id="location"
                  label="Location"
                  type="string"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
              </div>
                            {/* <div gap-2>
                                <Heading title="" subtitle="Difficulty" /> 
                                <br/>
                                <Slider 
                                    defaultValue={[0]} 
                                    max={5} 
                                    step={1}
                                    onValueChange={(value) => {
                                        setSliderValue(sliderValue);
                                        console.log(sliderValue)
                                        setValue("difficulty", sliderValue);
                                    }} 
                                />
                            </div> */}
                            <div className="flex flex-col space-y-1.5">
                                <Heading title="" subtitle="Game Type"/>
                                <Select>
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">1v1</SelectItem>
                                        <SelectItem value="2">2v2</SelectItem>
                                        <SelectItem value="3">3v3</SelectItem>
                                        <SelectItem value="5">5v5</SelectItem>
                                        <SelectItem value="0">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex justify-around center items-center">
                                <Heading title="" subtitle="Password Protect this game?"/>
                                <Switch
                                    checked={isPasswordEnabled}
                                    onCheckedChange={checked => setIsPasswordEnabled(checked)}
                                    />

                                </div>
                                {isPasswordEnabled && (
                                <Input
                                    id="passsword"
                                    label="Password"
                                    type="passsword"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                )}
                                {!isPasswordEnabled && (
                                    <div className="brightness-75">
                                    <Input
                                        id="passsword"
                                        label="Password"
                                        type="password"
                                        disabled={true}
                                        register={register}
                                        errors={errors}
                                        required
                                    />
                                    </div>
                                )}
                       </div>
            <CardFooter className="flex justify-between">
              <Button label="Submit" />
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}