import { useState } from 'react';
import { Button, Modal, Input, Select, Tag, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MainLayout from '../../components/Layout/MainLayout';
import withAuth from '../../components/Hoc/WithAuth';
import { 
  DragDropContext, 
  Droppable, 
  Draggable, 
  DroppableProvided, 
  DraggableProvided,
  DropResult
} from 'react-beautiful-dnd';

interface KanbanColumn {
  id: string;
  title: string;
  backgroundColor: string;
  items: KanbanItem[];
}

interface KanbanItem {
  id: string;
  title: string;
  description: string;
  users: string[];
  tags: string[];
}

function Task() {
  const [columns, setColumns] = useState<KanbanColumn[]>([]);
  const [isAddColumnModalVisible, setIsAddColumnModalVisible] = useState(false);
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string>('');
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newColumnColor, setNewColumnColor] = useState('#ffffff');
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemUsers, setNewItemUsers] = useState<string[]>([]);
  const [newItemTags, setNewItemTags] = useState<string[]>([]);

  const handleAddColumn = () => {
    if (!newColumnTitle) {
      message.error('Nama kolom harus diisi');
      return;
    }

    const newColumn: KanbanColumn = {
      id: Date.now().toString(),
      title: newColumnTitle,
      backgroundColor: newColumnColor,
      items: [],
    };

    setColumns([...columns, newColumn]);
    setIsAddColumnModalVisible(false);
    setNewColumnTitle('');
    setNewColumnColor('#ffffff');
  };

  const handleAddItem = () => {
    if (!newItemTitle) {
      message.error('Judul item harus diisi');
      return;
    }

    const newItem: KanbanItem = {
      id: Date.now().toString(),
      title: newItemTitle,
      description: newItemDescription,
      users: newItemUsers,
      tags: newItemTags,
    };

    setColumns(columns.map(col => {
      if (col.id === selectedColumnId) {
        return {
          ...col,
          items: [...col.items, newItem],
        };
      }
      return col;
    }));

    setIsAddItemModalVisible(false);
    setNewItemTitle('');
    setNewItemDescription('');
    setNewItemUsers([]);
    setNewItemTags([]);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newColumns = [...columns];
    
    const sourceColumn = newColumns.find(col => col.id === source.droppableId);
    const destColumn = newColumns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    const sourceItems = [...sourceColumn.items];
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedItem);
      
      const updatedColumn = {
        ...sourceColumn,
        items: sourceItems
      };

      setColumns(newColumns.map(col => 
        col.id === sourceColumn.id ? updatedColumn : col
      ));
    } else {
      const destItems = [...destColumn.items];
      destItems.splice(destination.index, 0, movedItem);

      const updatedSourceColumn = {
        ...sourceColumn,
        items: sourceItems
      };
      const updatedDestColumn = {
        ...destColumn,
        items: destItems
      };

      setColumns(newColumns.map(col => {
        if (col.id === sourceColumn.id) return updatedSourceColumn;
        if (col.id === destColumn.id) return updatedDestColumn;
        return col;
      }));
    }
  };

  return (
    <MainLayout activePage="task">
      <div className="relative bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Kanban Board</h1>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsAddColumnModalVisible(true)}
          >
            Tambah Kolom
          </Button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
              <div
                key={column.id}
                className="min-w-[300px] w-[300px] bg-gray-50 rounded-lg p-4"
                style={{ backgroundColor: column.backgroundColor }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">{column.title}</h3>
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setSelectedColumnId(column.id);
                      setIsAddItemModalVisible(true);
                    }}
                  />
                </div>

                <Droppable 
                  droppableId={column.id} 
                  isDropDisabled={false}
                  isCombineEnabled={false}
                  ignoreContainerClipping={false}
                >
                  {(provided: DroppableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-3 min-h-[100px] transition-all duration-200"
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                          isDragDisabled={false}
                        >
                          {(provided: DraggableProvided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white p-3 rounded shadow-sm cursor-move transition-all duration-200 ${
                                snapshot.isDragging ? 'shadow-lg scale-105' : ''
                              }`}
                              style={{
                                ...provided.draggableProps.style,
                                transform: snapshot.isDragging 
                                  ? provided.draggableProps.style?.transform 
                                  : 'none'
                              }}
                            >
                              <h4 className="font-medium mb-2">{item.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">
                                {item.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {item.tags.map((tag) => (
                                  <Tag key={tag} color="blue">
                                    {tag}
                                  </Tag>
                                ))}
                              </div>
                              <div className="mt-2">
                                {item.users.map((user) => (
                                  <Tag key={user}>{user}</Tag>
                                ))}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>

        {/* Modal Tambah Kolom */}
        <Modal
          title="Tambah Kolom Baru"
          open={isAddColumnModalVisible}
          onOk={handleAddColumn}
          onCancel={() => setIsAddColumnModalVisible(false)}
        >
          <div className="space-y-4">
            <Input
              placeholder="Nama Kolom"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
            />
            <Input
              type="color"
              value={newColumnColor}
              onChange={(e) => setNewColumnColor(e.target.value)}
            />
          </div>
        </Modal>

        {/* Modal Tambah Item */}
        <Modal
          title="Tambah Item Baru"
          open={isAddItemModalVisible}
          onOk={handleAddItem}
          onCancel={() => setIsAddItemModalVisible(false)}
        >
          <div className="space-y-4">
            <Input
              placeholder="Judul"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
            />
            <Input.TextArea
              placeholder="Deskripsi"
              value={newItemDescription}
              onChange={(e) => setNewItemDescription(e.target.value)}
            />
            <Select
              mode="tags"
              placeholder="Tags"
              value={newItemTags}
              onChange={setNewItemTags}
              className="w-full"
            />
            <Select
              mode="tags"
              placeholder="Users"
              value={newItemUsers}
              onChange={setNewItemUsers}
              className="w-full"
            />
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
}

export default withAuth(Task); 