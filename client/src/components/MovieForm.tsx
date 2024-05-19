import { Button, Checkbox, Col, Form, Input, InputNumber, Switch, message } from "antd";
import { Rule } from "antd/es/form";
import React, { memo } from "react";
import { IMovie } from "../redux/modules/types/CommonTypes";
import ImgUploader from "./ImgUploader";

interface IProps {
  onSubmit: (movie: IMovie) => Promise<string | undefined>;
}

const MovieForm: React.FC<IProps> = memo(function MovieForm(props) {
  const { onSubmit } = props;

  const onFinish = async (values: IMovie) => {
    console.log("Received values of form: ", values);
    const result = await onSubmit(values);
    if (result) {
      message.error(result);
    } else {
      message.success("处理成功");
    }
  };

  const allAreas: { label: string; value: string }[] = [
    { label: "中国大陆", value: "中国大陆" },
    { label: "美国", value: "美国" },
    { label: "中国台湾", value: "中国台湾" },
    { label: "中国香港", value: "中国香港" },
  ];
  const allTypes: { label: string; value: string }[] = [
    { label: "戏剧", value: "戏剧" },
    { label: "灾难", value: "灾难" },
    { label: "爱情", value: "爱情" },
    { label: "动作", value: "动作" },
  ];

  const formReuls: { [K in keyof IMovie]: undefined extends IMovie[K] ? Rule[] | undefined : Rule[] } = {
    name: [{ required: true, message: "请输入电影名称" }],
    areas: [{ required: true, message: "请选择电影地区" }],
    types: [{ required: true, message: "请选择电影类型" }],
    timeLong: [{ required: true, message: "请输入电影时长" }],
    isClasic: [{ required: true, message: "请选择是否经典影片" }],
    isHot: [{ required: true, message: "请选择是否热映" }],
    isComing: [{ required: true, message: "请选择是否即将上映" }],
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
    >
      <Form.Item label="电影名称" name="name" rules={formReuls.name}>
        <Input placeholder="请输入电影名称" />
      </Form.Item>
      <Form.Item label="时长(分钟)" name="timeLong" rules={formReuls.timeLong}>
        <InputNumber min={30} max={180} />
      </Form.Item>

      <Form.Item label="正在热映" name="isHot" rules={formReuls.isHot} initialValue={false}>
        <Switch />
      </Form.Item>
      <Form.Item label="即将上映" name="isComing" rules={formReuls.isComing} initialValue={false}>
        <Switch />
      </Form.Item>
      <Form.Item label="经典影片" name="isClasic" rules={formReuls.isClasic} initialValue={false}>
        <Switch />
      </Form.Item>
      <Form.Item label="地区" name="areas" rules={formReuls.areas}>
        <Checkbox.Group style={{ width: "100%" }}>
          {allAreas &&
            allAreas.map((item) => (
              <Col key={item.value}>
                <Checkbox value={item.value}>{item.label}</Checkbox>
              </Col>
            ))}
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="类型" name="types" rules={formReuls.types}>
        <Checkbox.Group style={{ width: "100%" }}>
          {allTypes &&
            allTypes.map((item) => (
              <Col key={item.value}>
                <Checkbox value={item.value}>{item.label}</Checkbox>
              </Col>
            ))}
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="封面" name="poster">
        <ImgUploader />
      </Form.Item>
      <Form.Item label="描述" name="description">
        <Input.TextArea placeholder="请输入描述" />
      </Form.Item>
      <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 20, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
});

export default MovieForm;
