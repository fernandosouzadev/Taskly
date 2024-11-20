'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Plus,
  Bell,
  Clock,
  DollarSign,
  Send,
  Edit,
} from 'lucide-react';
import { Editor } from '@/components/rich-text';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  stage: 'not-started' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  team: string;
  assignee: {
    name: string;
    avatar: string;
  };
  owner: string;
  rewardType: 'money' | 'time';
  rewardValue: string;
  comments: { id: number; author: string; text: string; timestamp: string }[];
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Lavar a louça',
    description: 'Lavar toda a louça do almoço',
    dueDate: 'Hoje',
    stage: 'in-progress',
    priority: 'high',
    team: 'Casa',
    assignee: {
      name: 'João',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    owner: 'Maria',
    rewardType: 'money',
    rewardValue: '10',
    comments: [
      {
        id: 1,
        author: 'Maria',
        text: 'Não esqueça de usar o detergente novo!',
        timestamp: '2023-05-20T14:30:00Z',
      },
    ],
  },
  {
    id: 2,
    title: 'Arrumar o quarto',
    description: 'Organizar brinquedos e fazer a cama',
    dueDate: 'Hoje',
    stage: 'not-started',
    priority: 'medium',
    team: 'Casa',
    assignee: {
      name: 'Maria',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    owner: 'João',
    rewardType: 'time',
    rewardValue: '30',
    comments: [],
  },
  {
    id: 3,
    title: 'Fazer lição de casa',
    description: 'Matemática e Português',
    dueDate: 'Amanhã',
    stage: 'not-started',
    priority: 'high',
    team: 'Escola',
    assignee: {
      name: 'Pedro',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    owner: 'You',
    rewardType: 'time',
    rewardValue: '45',
    comments: [],
  },
];

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [showTaskDetailsDialog, setShowTaskDetailsDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    rewardType: 'money',
    rewardValue: '',
    priority: 'medium',
    stage: 'not-started',
    dueDate: '',
    team: '',
    assignee: { name: '', avatar: '' },
    owner: 'You',
    comments: [],
  });
  const [newComment, setNewComment] = useState('');
  const currentUser = 'You';

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100/80';
      case 'medium':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-100/80';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100/80';
    }
  };

  const getStageColor = (stage: Task['stage']) => {
    switch (stage) {
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateTask = () => {
    const createdTask: Task = {
      ...(newTask as Task),
      id: tasks.length + 1,
      comments: [],
    };
    setTasks([...tasks, createdTask]);
    setShowNewTaskDialog(false);
    setNewTask({
      title: '',
      description: '',
      rewardType: 'money',
      rewardValue: '',
      priority: 'medium',
      stage: 'not-started',
      dueDate: '',
      team: '',
      assignee: { name: '', avatar: '' },
      owner: 'You',
      comments: [],
    });
  };

  const handleAddComment = () => {
    if (selectedTask && newComment.trim() !== '') {
      const updatedTask = {
        ...selectedTask,
        comments: [
          ...selectedTask.comments,
          {
            id: selectedTask.comments.length + 1,
            author: currentUser,
            text: newComment,
            timestamp: new Date().toISOString(),
          },
        ],
      };
      setTasks(
        tasks.map((task) => (task.id === selectedTask.id ? updatedTask : task))
      );
      setSelectedTask(updatedTask);
      setNewComment('');
    }
  };

  const handleUpdateTask = () => {
    if (selectedTask) {
      setTasks(
        tasks.map((task) => (task.id === selectedTask.id ? selectedTask : task))
      );
      setIsEditing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-cyan-100">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Buscar tarefas..." className="pl-8" />
            </div>
            <Button
              onClick={() => setShowNewTaskDialog(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Tarefa
            </Button>
          </div>

          {/* Task List */}
          <div className="space-y-8">
            {['Hoje', 'Amanhã'].map((day) => (
              <div key={day}>
                <h2 className="text-lg font-semibold mb-4">{day}</h2>
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="grid grid-cols-[auto,1fr,auto,auto,auto,auto] gap-4 p-4 border-b text-sm text-gray-500">
                    <div className="w-8"></div>
                    <div>TAREFA</div>
                    <div>PRAZO</div>
                    <div>STATUS</div>
                    <div>PRIORIDADE</div>
                    <div>RECOMPENSA</div>
                  </div>
                  {tasks
                    .filter((task) => task.dueDate === day)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="grid grid-cols-[auto,8fr,auto,auto,auto,1fr] gap-6 p-4  items-center border-b last:border-0 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSelectedTask(task);
                          setShowTaskDetailsDialog(true);
                          setIsEditing(false);
                        }}
                      >
                        <Checkbox />
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback>
                              {task.assignee.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-gray-500">
                              {task.team}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm">{task.dueDate}</div>
                        <Badge
                          variant="secondary"
                          className={getStageColor(task.stage)}
                        >
                          {task.stage === 'in-progress'
                            ? 'Em progresso'
                            : task.stage === 'completed'
                              ? 'Concluído'
                              : 'Não iniciado'}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={getPriorityColor(task.priority)}
                        >
                          {task.priority === 'high'
                            ? 'Alta'
                            : task.priority === 'medium'
                              ? 'Média'
                              : 'Baixa'}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          {task.rewardType === 'money' ? (
                            <>
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="text-green-600">
                                R$ {task.rewardValue}
                              </span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span className="text-blue-600">
                                {task.rewardValue} min
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Task Dialog */}
      <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
        <DialogContent className="sm:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>Nova Tarefa</DialogTitle>
            <DialogDescription>
              Crie uma nova tarefa preenchendo os campos abaixo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-[2fr,1fr] gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Editor />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="assignee">Responsável</Label>
                <Select
                  onValueChange={(value) =>
                    setNewTask({
                      ...newTask,
                      assignee: { name: value, avatar: '' },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="João">João</SelectItem>
                    <SelectItem value="Maria">Maria</SelectItem>
                    <SelectItem value="Pedro">Pedro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dueDate">Data de Entrega</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: Task['priority']) =>
                    setNewTask({ ...newTask, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Recompensa</Label>
                <div className="flex gap-2">
                  <Select
                    value={newTask.rewardType}
                    onValueChange={(value: Task['rewardType']) =>
                      setNewTask({ ...newTask, rewardType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="money">Dinheiro</SelectItem>
                      <SelectItem value="time">Tempo</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={newTask.rewardValue}
                    onChange={(e) =>
                      setNewTask({ ...newTask, rewardValue: e.target.value })
                    }
                    placeholder={
                      newTask.rewardType === 'money'
                        ? 'Valor em R$'
                        : 'Tempo em minutos'
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleCreateTask}
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              Criar Tarefa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Task Details Dialog */}
      <Dialog
        open={showTaskDetailsDialog}
        onOpenChange={setShowTaskDetailsDialog}
      >
        <DialogContent className="sm:max-w-[1000px]">
          {selectedTask && (
            <>
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  {selectedTask.title}
                  {selectedTask.owner === currentUser && !isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  )}
                </DialogTitle>
                <DialogDescription>
                  Detalhes da tarefa e comunicação
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <div className="grid grid-cols-[2fr,1fr] gap-6">
                    <div className="space-y-4 border-r-2 pr-4">
                      <div>
                        <Label>Descrição</Label>
                        {isEditing ? (
                          <Editor />
                        ) : (
                          <div className="mt-1 p-2 bg-gray-100 rounded-md min-h-60">
                            {selectedTask.description}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <Label>Responsável</Label>
                        {isEditing ? (
                          <Select
                            value={selectedTask.assignee.name}
                            onValueChange={(value) =>
                              setSelectedTask({
                                ...selectedTask,
                                assignee: {
                                  ...selectedTask.assignee,
                                  name: value,
                                },
                              })
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="João">João</SelectItem>
                              <SelectItem value="Maria">Maria</SelectItem>
                              <SelectItem value="Pedro">Pedro</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="mt-1 flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={selectedTask.assignee.avatar} />
                              <AvatarFallback>
                                {selectedTask.assignee.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span>{selectedTask.assignee.name}</span>
                          </div>
                        )}
                      </div>
                      <div
                        className={isEditing ? '' : 'flex items-center p-0 m-0'}
                      >
                        <Label className="pr-2">Data de Entrega:</Label>
                        {isEditing ? (
                          <Input
                            type="date"
                            value={selectedTask.dueDate}
                            onChange={(e) =>
                              setSelectedTask({
                                ...selectedTask,
                                dueDate: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        ) : (
                          <Badge
                            variant="outline"
                            className={`mt-1 bg-gray-300`}
                          >
                            {selectedTask.dueDate}
                          </Badge>
                        )}
                      </div>
                      <div>
                        <Label className="pr-2">Prioridade:</Label>
                        {isEditing ? (
                          <Select
                            value={selectedTask.priority}
                            onValueChange={(value: Task['priority']) =>
                              setSelectedTask({
                                ...selectedTask,
                                priority: value,
                              })
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Baixa</SelectItem>
                              <SelectItem value="medium">Média</SelectItem>
                              <SelectItem value="high">Alta</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge
                            variant="secondary"
                            className={`mt-1 ${getPriorityColor(selectedTask.priority)}`}
                          >
                            {selectedTask.priority === 'high'
                              ? 'Alta'
                              : selectedTask.priority === 'medium'
                                ? 'Média'
                                : 'Baixa'}
                          </Badge>
                        )}
                      </div>
                      <div>
                        <Label className="pr-2">Status:</Label>
                        {isEditing ? (
                          <Select
                            value={selectedTask.stage}
                            onValueChange={(value: Task['stage']) =>
                              setSelectedTask({ ...selectedTask, stage: value })
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="not-started">
                                Não iniciado
                              </SelectItem>
                              <SelectItem value="in-progress">
                                Em progresso
                              </SelectItem>
                              <SelectItem value="completed">
                                Concluído
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge
                            variant="secondary"
                            className={`mt-1 ${getStageColor(selectedTask.stage)}`}
                          >
                            {selectedTask.stage === 'in-progress'
                              ? 'Em progresso'
                              : selectedTask.stage === 'completed'
                                ? 'Concluído'
                                : 'Não iniciado'}
                          </Badge>
                        )}
                      </div>
                      <div
                        className={isEditing ? '' : 'flex items-center p-0 m-0'}
                      >
                        <Label className="pr-2">Recompensa:</Label>
                        {isEditing ? (
                          <div className="flex gap-2">
                            <Select
                              value={selectedTask.rewardType}
                              onValueChange={(value: Task['rewardType']) =>
                                setSelectedTask({
                                  ...selectedTask,
                                  rewardType: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="money">Dinheiro</SelectItem>
                                <SelectItem value="time">Tempo</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              value={selectedTask.rewardValue}
                              onChange={(e) =>
                                setSelectedTask({
                                  ...selectedTask,
                                  rewardValue: e.target.value,
                                })
                              }
                              placeholder={
                                selectedTask.rewardType === 'money'
                                  ? 'Valor em R$'
                                  : 'Tempo em minutos'
                              }
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            {selectedTask.rewardType === 'money' ? (
                              <>
                                <DollarSign className="h-4 w-4 text-green-600" />
                                <span className="text-green-600">
                                  R$ {selectedTask.rewardValue}
                                </span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-4 w-4 text-blue-600" />
                                <span className="text-blue-600">
                                  {selectedTask.rewardValue} min
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {isEditing && (
                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={handleUpdateTask}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black"
                      >
                        Salvar Alterações
                      </Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="chat">
                  <div className="space-y-4">
                    <div className="h-[300px] overflow-y-auto space-y-2">
                      {selectedTask.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-gray-50 p-2 rounded-md"
                        >
                          <div className="font-medium">{comment.author}</div>
                          <div>{comment.text}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(comment.timestamp).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Editor />

                      <Button onClick={handleAddComment} className="self-end">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
