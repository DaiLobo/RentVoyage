import { ImagePlus, UploadIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { Dispatch, SetStateAction } from "react";
import Dropzone from "react-dropzone";

import { Button } from "./ui/button";

interface DropzoneImagesProps {
  files?: File[];
  setFiles: Dispatch<SetStateAction<File[] | undefined>>
}

export const DropzoneImages: React.FC<DropzoneImagesProps> = ({ files, setFiles }) => {
  const { t } = useTranslation("property");

  return (
    <>
      <Dropzone onDrop={acceptedFiles => setFiles(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section className="mt-2">
            <div {...getRootProps()} className="flex items-center justify-center w-full bg-slate-50 border-dashed border-2 border-slate-300 h-48 cursor-pointer">
              <input {...getInputProps()} />
              <div className="flex flex-col items-center">
                <UploadIcon size={32} color="grey" />
                <Button className="my-4" type="button">{t("dropzone.button")}</Button>
                <p className="text-slate-500">{t("dropzone.dragdrop")}</p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>

      <div>
        {
          files?.map((file, index) => (
            <div key={index} className="flex flex-row items-center gap-2 mt-4">
              <ImagePlus size={18} /> {file.name}
            </div>
          ))
        }
      </div>
    </>
  )
}