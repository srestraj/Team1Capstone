export type ImageInputProps = {
  classNames: string;
  handleUrlInput: (url: string) => void;
  imgUrl: string;
  inputId: string;
  isInput: boolean;
  title: string;
  toggleInput: (val: boolean) => void;
  triggerUpload: (file: File) => void;
};