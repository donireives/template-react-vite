import { useEffect, useState } from 'react'
import { Button, Input, Table, Tag, message, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { PlusOutlined, SearchOutlined, MoreOutlined } from '@ant-design/icons'
import MainLayout from '../../components/Layout/MainLayout'
import withAuth from '../../components/Hoc/WithAuth'
import DummyApiService from '../../services/DummyApiService'
import AddEditLabelModal from '../../components/Label/AddEditLabelModal'
import DeleteLabelModal from '../../components/Label/DeleteLabelModal'

interface LabelData {
  key: number
  name: string
  status: string
  createdAt: string
}

function LabelSetting() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<LabelData[]>([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })
  const [addEditModalVisible, setAddEditModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState<LabelData | null>(null)

  const fetchData = async (page = 1, pageSize = 10) => {
    setLoading(true)
    try {
      const response = await DummyApiService.label.getList(page, pageSize)
      setData(response.data)
      setPagination({
        ...pagination,
        total: response.pagination.total,
        current: page,
        pageSize: pageSize
      })
    } catch (error) {
      message.error('Failed to fetch labels')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleTableChange = (newPagination: any) => {
    fetchData(newPagination.current, newPagination.pageSize)
  }

  const handleAdd = () => {
    setSelectedLabel(null)
    setAddEditModalVisible(true)
  }

  const handleEdit = (record: LabelData) => {
    setSelectedLabel(record)
    setAddEditModalVisible(true)
  }

  const handleDelete = (record: LabelData) => {
    setSelectedLabel(record)
    setDeleteModalVisible(true)
  }

  const handleModalSuccess = () => {
    setAddEditModalVisible(false)
    setDeleteModalVisible(false)
    setSelectedLabel(null)
    fetchData()
  }

  const getActionMenu = (record: LabelData): MenuProps => ({
    items: [
      {
        key: 'edit',
        label: 'Update Data',
        onClick: () => handleEdit(record)
      },
      {
        type: 'divider'
      },
      {
        key: 'delete',
        label: 'Delete',
        danger: true,
        onClick: () => handleDelete(record)
      }
    ]
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      render: (status: string) => (
        <Tag color={status === 'Completed' ? 'success' : 'warning'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: '20px',
      render: (_: any, record: LabelData) => (
        <Dropdown
          menu={getActionMenu(record)}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            className="border-none hover:bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center"
          />
        </Dropdown>
      ),
    },
  ]

  return (
    <MainLayout activePage="label">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Label Management</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Add New Label
          </Button>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Search labels..."
            prefix={<SearchOutlined className="text-gray-400" />}
            onChange={() => { /* search logic belum diimplementasikan */ }}
            className="max-w-xs"
            allowClear
          />
        </div>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: false,
            showTotal: (total) => `${total} items`,
            pageSize: 10,
            pageSizeOptions: ['10'],
            position: ['bottomRight'],
            className: 'ant-pagination-simple',
          }}
          onChange={handleTableChange}
          loading={loading}
          className="border border-gray-200 rounded"
        />
      </div>

      {/* Add/Edit Modal */}
      <AddEditLabelModal
        visible={addEditModalVisible}
        onCancel={() => setAddEditModalVisible(false)}
        onSuccess={handleModalSuccess}
        initialData={selectedLabel ?? undefined}
      />

      {/* Delete Modal */}
      <DeleteLabelModal
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onSuccess={handleModalSuccess}
        labelId={selectedLabel?.key || 0}
        labelName={selectedLabel?.name || ''}
      />
    </MainLayout>
  )
}

export default withAuth(LabelSetting) 