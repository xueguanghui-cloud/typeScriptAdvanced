import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Image, Upload, message } from "antd";
import React, { memo, useEffect, useState } from "react";
import { IResponseError, IResponseSuccess } from "../redux/modules/types/CommonTypes";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IImgUploaderProps {
  value?: UploadFile;
  onChange?: (file: UploadFile | undefined) => void;
}

const ImgUploader: React.FC<IImgUploaderProps> = memo(function ImgUploader(props) {
  const { value, onChange } = props;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const customRequestHandle: UploadProps<{ file: FileType; action: string }>["customRequest"] = async ({
    file,
    action,
  }) => {
    const formData = new FormData();
    formData.append("file", file);

    const request = new Request(action, { method: "post", body: formData });
    const result: IResponseSuccess<string> | IResponseError = await fetch(request).then((res) => res.json());

    if (result.code === 0) {
      message.error(result.error);
    } else {
      message.success(result.message);

      onChange &&
        onChange({
          uid: (file as FileType).uid,
          name: (file as FileType).name,
          url: result.data!,
        });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  useEffect(() => {
    if (value) {
      setFileList([value]);
    } else {
      setFileList([]);
    }
  }, [value]);
  return (
    <>
      <Upload
        action="/api/upload"
        listType="picture-card"
        accept=".jpg,.png,.gif"
        maxCount={1}
        fileList={fileList}
        onPreview={handlePreview}
        customRequest={customRequestHandle}
        onRemove={() => onChange && onChange(undefined)}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
});

export default ImgUploader;
