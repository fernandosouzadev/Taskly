'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ArrowLeft, Plus, Star, Trophy, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FamilyManagement() {
  const router = useRouter();
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: 'João',
      email: 'teste@teste.com',
      role: 'Filho',
      avatar: '/placeholder.svg?height=40&width=40',
      points: 120,
      rewards: '1h 15min',
    },
    {
      id: 2,
      name: 'Maria',
      email: 'teste@teste.com',
      role: 'Filha',
      avatar: '/placeholder.svg?height=40&width=40',
      points: 150,
      rewards: '1h 30min',
    },
    {
      id: 3,
      name: 'Pedro',
      email: 'teste@teste.com',
      role: 'Filho',
      avatar: '/placeholder.svg?height=40&width=40',
      points: 90,
      rewards: '45min',
    },
  ]);

  const [newMember, setNewMember] = useState({ name: '', email: '', role: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddMember = () => {
    if (newMember.name && newMember.role) {
      setFamilyMembers([
        ...familyMembers,
        {
          ...newMember,
          id: familyMembers.length + 1,
          avatar: '/placeholder.svg?height=40&width=40',
          points: 0,
          rewards: '0min',
        },
      ]);
      setNewMember({ name: '', role: '', email: '' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="mr-4"
              onClick={() => router.push('/dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Gerenciar Família
            </h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Adicionar Membro
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Membro</DialogTitle>
                <DialogDescription>
                  Preencha as informações do novo membro da família.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) =>
                      setNewMember({ ...newMember, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="Email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={newMember.email}
                    onChange={(e) =>
                      setNewMember({ ...newMember, email: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Papel
                  </Label>
                  <Select
                    value={newMember.role}
                    onValueChange={(value) =>
                      setNewMember({ ...newMember, role: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione um papel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Filho">Filho</SelectItem>
                      <SelectItem value="Filha">Filha</SelectItem>
                      <SelectItem value="Pai">Pai</SelectItem>
                      <SelectItem value="Mãe">Mãe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddMember}>
                  Adicionar Membro
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {familyMembers.map((member) => (
            <Card key={member.id} className="bg-white shadow-md">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 text-purple-500 mr-2" />
                    <span className="text-purple-600 font-semibold">
                      {member.points} pontos
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-blue-600 font-semibold">
                      {member.rewards}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card
            onClick={() => setIsDialogOpen(true)}
            className="bg-white shadow-md border-2 border-dashed border-gray-300 flex items-center justify-center h-[200px] cursor-pointer transition-all hover:brightness-95"
          >
            <Plus className="h-6 w-6 mr-2" />
            Adicionar Membro
          </Card>
        </div>
      </main>
    </div>
  );
}
