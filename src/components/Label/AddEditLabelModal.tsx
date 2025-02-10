import React from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import DummyApiService from '../../services/DummyApiService'

interface AddEditLabelModalProps {
  visible: boolean
  onCancel: () => void
  onSuccess: () => void
  initialData?: {
    key: number
    name: string
    status: string
  }
}

const AddEditLabelModal: React.FC<AddEditLabelModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  initialData
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (visible) {
      if (initialData) {
        form.setFieldsValue(initialData)
      } else {
        // Reset form when opening in add mode
        form.resetFields()
        form.setFieldsValue({ status: 'Pending' }) // Set default value
      }
    }
  }, [visible, initialData, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      if (initialData?.key) {
        // Edit mode
        await DummyApiService.label.update(initialData.key, values)
        message.success('Label updated successfully')
      } else {
        // Add mode
        await DummyApiService.label.add(values)
        message.success('Label added successfully')
      }

      form.resetFields()
      onSuccess()
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to save label')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={initialData ? 'Edit Label' : 'Add New Label'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ status: 'Pending' }}
      >
        <Form.Item
          name="name"
          label="Label Name"
          rules={[{ required: true, message: 'Please input label name!' }]}
        >
          <Input placeholder="Enter label name" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
        >
          <Select>
            <Select.Option value="Pending">Pending</Select.Option>
            <Select.Option value="Completed">Completed</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddEditLabelModal 