import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

function LabelModal({ 
    isVisible, 
    onCancel, 
    onSubmit, 
    editingLabel, 
    loading,
    form 
}) {
    return (
        <Modal
            title={editingLabel ? "Edit Label" : "Add New Label"}
            open={isVisible}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
            >
                <Form.Item
                    name="name"
                    label="Label Name"
                    rules={[
                        { required: true, message: 'Please input the label name!' },
                        { min: 3, message: 'Label name must be at least 3 characters!' }
                    ]}
                >
                    <Input placeholder="Enter label name" />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    initialValue="Pending"
                >
                    <Select>
                        <Option value="Pending">Pending</Option>
                        <Option value="Completed">Completed</Option>
                    </Select>
                </Form.Item>

                <Form.Item className="mb-0">
                    <div className="d-flex justify-content-end gap-2">
                        <Button onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {editingLabel ? 'Update Label' : 'Add Label'}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default LabelModal; 