import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useTheme } from '@/hooks/useTheme';
import withAuth from '@/components/hoc/withAuth';
import { Table, Button, Space, Input, Tag, Modal, Form, message, App, Select, Dropdown } from 'antd';
import { SearchOutlined, PlusOutlined, MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MainApi from '@/services/mainApiServices/MainApi';
import LabelModal from '@/components/label/LabelModal';

const { Option } = Select;

function Label() {
    const { theme: currentTheme } = useTheme();
    const [searchText, setSearchText] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [form] = Form.useForm();
    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
        total: 0
    });
    const [editingLabel, setEditingLabel] = React.useState(null);
    const [modal, contextHolder] = Modal.useModal();

    const fetchData = async (page = 1, pageSize = 10) => {
        setLoading(true);
        try {
            const result = await MainApi.label.getList(page, pageSize);
            setData(result.data);
            setPagination(result.pagination);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange = (newPagination) => {
        fetchData(newPagination.current, newPagination.pageSize);
    };

    const handleAdd = async (values) => {
        try {
            setLoading(true);
            const newLabel = await MainApi.label.add(values);
            
            // Update data list dengan item baru
            setData([newLabel, ...data]);
            
            message.success('Label added successfully');
            setIsModalVisible(false);
            form.resetFields();
            
            // Refresh data
            fetchData(pagination.current, pagination.pageSize);
        } catch (error) {
            message.error('Failed to add label');
            console.error('Error adding label:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (values) => {
        try {
            setLoading(true);
            const updatedLabel = await MainApi.label.update(editingLabel.key, values);
            
            // Update data list dengan item yang diupdate
            setData(data.map(item => 
                item.key === editingLabel.key ? updatedLabel : item
            ));
            
            message.success('Label updated successfully');
            setIsModalVisible(false);
            form.resetFields();
            setEditingLabel(null);
            
            // Refresh data
            fetchData(pagination.current, pagination.pageSize);
        } catch (error) {
            message.error('Failed to update label');
            console.error('Error updating label:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (record) => {
        modal.confirm({
            title: 'Delete Label',
            content: `Are you sure you want to delete "${record.name}"?`,
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'No, Cancel',
            onOk: async () => {
                try {
                    setLoading(true);
                    await MainApi.label.delete(record.key);
                    
                    // Remove item dari list
                    setData(data.filter(item => item.key !== record.key));
                    
                    message.success('Label deleted successfully');
                    
                    // Refresh data jika list kosong
                    if (data.length === 1) {
                        const newPage = pagination.current > 1 ? pagination.current - 1 : 1;
                        fetchData(newPage, pagination.pageSize);
                    }
                } catch (error) {
                    message.error('Failed to delete label');
                    console.error('Error deleting label:', error);
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    const handleSubmit = async (values) => {
        if (editingLabel) {
            await handleEdit(values);
        } else {
            await handleAdd(values);
        }
    };

    const showModal = (record = null) => {
        setEditingLabel(record);
        if (record) {
            form.setFieldsValue({
                name: record.name,
                status: record.status
            });
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
        setEditingLabel(null);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return String(record.name)
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Completed' ? 'blue' : 'red'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 80,
            render: (_, record) => {
                const items = [
                    {
                        key: 'edit',
                        icon: <EditOutlined />,
                        label: 'Edit',
                        onClick: () => showModal(record)
                    },
                    {
                        key: 'delete',
                        icon: <DeleteOutlined />,
                        label: 'Delete',
                        danger: true,
                        onClick: () => handleDelete(record)
                    }
                ];

                return (
                    <Dropdown
                        menu={{ items }}
                        placement="bottomRight"
                        trigger={['click']}
                    >
                        <Button 
                            type="text" 
                            icon={<MoreOutlined />}
                            className="border-0"
                        />
                    </Dropdown>
                );
            }
        },
    ];

    return (
        <MainLayout activePage="label">
            <App>
                {contextHolder}
                <div className={`rounded shadow ${currentTheme === 'dark' ? 'bg-darker' : 'bg-white'}`}>
                    <div className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="mb-0">Label Management</h3>
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
                                Add New Label
                            </Button>
                        </div>

                        {/* Search Bar */}
                        <div className="mb-4">
                            <Input
                                placeholder="Search labels..."
                                prefix={<SearchOutlined />}
                                onChange={(e) => setSearchText(e.target.value)}
                                style={{ width: 300 }}
                            />
                        </div>

                        {/* Table */}
                        <Table
                            size="small"
                            columns={columns}
                            dataSource={data}
                            loading={loading}
                            pagination={pagination}
                            onChange={handleTableChange}
                        />

                        {/* Label Modal Component */}
                        <LabelModal
                            isVisible={isModalVisible}
                            onCancel={handleCancel}
                            onSubmit={handleSubmit}
                            editingLabel={editingLabel}
                            loading={loading}
                            form={form}
                        />
                    </div>
                </div>
            </App>
        </MainLayout>
    );
}

export default withAuth(Label); 