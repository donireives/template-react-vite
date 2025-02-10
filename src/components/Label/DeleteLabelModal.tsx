import React from 'react'
import { Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import DummyApiService from '../../services/DummyApiService'

interface DeleteLabelModalProps {
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
  labelId: number
  labelName: string
}

const DeleteLabelModal: React.FC<DeleteLabelModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  labelId,
  labelName
}) => {
  const [loading, setLoading] = React.useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await DummyApiService.label.delete(labelId)
      message.success('Label deleted successfully')
      onSuccess()
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to delete label')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Delete Label"
      open={visible}
      onCancel={onCancel}
      onOk={handleDelete}
      confirmLoading={loading}
      okText="Delete"
      okButtonProps={{ danger: true }}
    >
      <div className="flex items-center gap-3 mb-4">
        <ExclamationCircleOutlined className="text-2xl text-yellow-500" />
        <span>Are you sure you want to delete this label?</span>
      </div>
      <p className="text-gray-500">
        Label: <span className="font-medium">{labelName}</span>
      </p>
    </Modal>
  )
}

export default DeleteLabelModal 