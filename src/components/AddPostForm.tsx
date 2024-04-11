import { addPost } from "@/store/slices/postSlice";
import { fetchUsers, selectAllUsers } from "@/store/slices/userSlice";
import { AppDispatch } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userID, setUserID] = useState("");

  const canSave = Boolean(title) && Boolean(description) && Boolean(userID);

  const { toast } = useToast();
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    if (users.status === "idle") {
      dispatch(fetchUsers());
    }
  }, [users, dispatch]);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  const onAuthorChange = (userID: string) => {
    setUserID(userID);
  };

  const onPostSave = (
    e: React.FormEvent<HTMLFormElement>,
    userAgent: string
  ) => {
    e.preventDefault();
    if (title && description) {
      dispatch(addPost(title, description, userID, userAgent));
      toast({
        description: "Your Post has been saved",
        variant: "default",
      });
      setTitle("");
      setDescription("");
    }
  };

  const renderUsers = users.users.map((user) => (
    <SelectItem key={user.id} value={String(user.id)}>
      {user.name}
    </SelectItem>
  ));

  return (
    <section>
      <h2 className='text-3xl font-semibold mb-5'>Add new Post</h2>
      <form
        onSubmit={(e) => onPostSave(e, navigator.userAgent)}
        className='flex flex-col gap-5'
      >
        <Label className='text-2xl' htmlFor='title'>
          Title:
        </Label>
        <Input
          type='text'
          name='title'
          id='title'
          placeholder='Title'
          value={title}
          onChange={onTitleChange}
        />
        <Label className='text-2xl' htmlFor='description'>
          Description:
        </Label>
        <Textarea
          name='description'
          id='description'
          value={description}
          onChange={onDescriptionChange}
        ></Textarea>
        <Label className='text-2xl' htmlFor='author'>
          Author:
        </Label>
        <Select onValueChange={onAuthorChange} value={String(userID)}>
          <SelectTrigger name='author' id='author' className='w-[180px]'>
            <SelectValue placeholder='Select Author' />
          </SelectTrigger>
          <SelectContent>{renderUsers}</SelectContent>
        </Select>
        <div className={!canSave ? "cursor-not-allowed" : ""}>
          <Button type='submit' className='w-full h-full' disabled={!canSave}>
            Save Post
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;
