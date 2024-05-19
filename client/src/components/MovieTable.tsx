import { Button, Flex, Image, Input, Popconfirm, Space, Switch, Table } from "antd";
import { TablePaginationConfig, TableProps } from "antd/es/table";
import { memo } from "react";
import { IMovieState } from "../redux/modules/Movie/type";
import { IMovie, SwitchType } from "../redux/modules/types/CommonTypes";
import { useNavigate } from "react-router";
import { FilterValue } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";

interface IMovieTablePorops extends IMovieState {
  onSwitchChange: (type: SwitchType, newValue: boolean, id: string) => void;
  onDelete: (id: string) => void;
  onChange: (newPage: number) => void;
  onKeyChange: (key: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

const MovieTable = memo(function MovieTable(props: IMovieTablePorops) {
  const { data, total, condition, isLoading, onChange, onSwitchChange, onDelete, onKeyChange, onSearch, onReset } =
    props;

  const navigate = useNavigate();

  const onEditHandle = (id: string) => {
    navigate(`/movie/edit/${id}`);
  };

  const columns: TableProps<IMovie>["columns"] = [
    {
      title: "电影名称",
      dataIndex: "name",
      key: "name",
      filterIcon: <SearchOutlined />,
      filterDropdown: () => {
        return (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              style={{ marginBottom: 8, display: "block" }}
              value={condition.key}
              placeholder="请输入电影名称"
              onChange={(e) => onKeyChange(e.target.value)}
            />
            <Space>
              <Button type="primary" icon={<SearchOutlined />} size="small" style={{ width: 90 }} onClick={onSearch}>
                搜索
              </Button>
              <Button size="small" style={{ width: 90 }} onClick={onReset}>
                重置
              </Button>
            </Space>
          </div>
        );
      },
    },
    {
      title: "电影类型",
      dataIndex: "types",
      key: "types",
      render: (types: string[]) => {
        return types.join(", ");
      },
    },
    {
      title: "上映地区",
      dataIndex: "areas",
      key: "areas",
      render: (areas: string[]) => {
        return areas.join(", ");
      },
    },
    {
      title: "电影时长",
      dataIndex: "timeLong",
      key: "timeLong",
      render: (timeLong: number) => {
        return timeLong + "分钟";
      },
    },
    {
      title: "正在热映",
      dataIndex: "isHot",
      key: "isHot",
      render: (isHot: boolean, record: IMovie) => {
        return (
          <Switch
            checked={isHot}
            onChange={(checked: boolean) => onSwitchChange(SwitchType.Hot, checked, record._id!)}
          />
        );
      },
    },
    {
      title: "即将上映",
      dataIndex: "isComing",
      key: "isComing",
      render: (isComing: boolean, record: IMovie) => {
        return (
          <Switch
            checked={isComing}
            onChange={(checked: boolean) => onSwitchChange(SwitchType.Coming, checked, record._id!)}
          />
        );
      },
    },
    {
      title: "经典影片",
      dataIndex: "isClasic",
      key: "isClasic",
      render: (isClasic: boolean, record: IMovie) => {
        return (
          <Switch
            checked={isClasic}
            onChange={(checked: boolean) => onSwitchChange(SwitchType.Classic, checked, record._id!)}
          />
        );
      },
    },
    {
      title: "简介",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "封面",
      dataIndex: "poster",
      key: "poster",
      render: (poster: string) => {
        return (
          <Image
            width={50}
            height={50}
            src={poster}
            fallback="data:image/png;base64,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"
          />
        );
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text: string, record: IMovie) => {
        return (
          <Flex gap="small">
            <Button type="primary" size="small" onClick={() => onEditHandle(record._id!)}>
              编辑
            </Button>
            <Popconfirm title="确定删除吗？" onConfirm={(e) => onDelete(record._id!)} okText="确认" cancelText="取消">
              <Button type="primary" danger size="small">
                删除
              </Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  const pageConfig = (): false | TablePaginationConfig => {
    if (total === 0) return false;

    return {
      current: condition.page,
      pageSize: condition.limit,
      total: total,
    };
  };

  const onPageChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>) => {
    onChange(pagination.current!);
  };

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={pageConfig()}
      onChange={onPageChange}
      loading={isLoading}
    ></Table>
  );
});

export default MovieTable;
