'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  CheckCircle,
  ListTodo,
  Star,
  Trophy,
  Users,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { useRouter } from 'next/navigation';

const dailyData = [
  { name: 'Seg', tarefas: 4 },
  { name: 'Ter', tarefas: 3 },
  { name: 'Qua', tarefas: 5 },
  { name: 'Qui', tarefas: 2 },
  { name: 'Sex', tarefas: 6 },
  { name: 'Sáb', tarefas: 4 },
  { name: 'Dom', tarefas: 3 },
];

const weeklyData = [
  { name: 'Semana 1', tarefas: 20 },
  { name: 'Semana 2', tarefas: 25 },
  { name: 'Semana 3', tarefas: 30 },
  { name: 'Semana 4', tarefas: 22 },
];

export default function ParentDashboard() {
  const [progress, setProgress] = useState(65);
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
            onClick={() => router.push('/family-management')}
          >
            <Users className="mr-2 h-4 w-4" /> Família
          </Button>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tarefas Criadas
              </CardTitle>
              <ListTodo className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">24</div>
              <p className="text-xs text-gray-500">+2 desde ontem</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tarefas Concluídas
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">16</div>
              <p className="text-xs text-gray-500">+5 desde ontem</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Recompensas
              </CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    R$ 45,00
                  </div>
                  <p className="text-xs text-gray-500">Dinheiro</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    2h 30min
                  </div>
                  <p className="text-xs text-gray-500">Tempo de Tela</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Progresso Semanal
              </CardTitle>
              <Trophy className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-gray-500 mt-2">65% completo</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6">
          <Tabs defaultValue="daily" className="bg-white shadow-md rounded-lg">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="daily">Progresso Diário</TabsTrigger>
              <TabsTrigger value="weekly">Progresso Semanal</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tarefas" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="weekly" className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="tarefas"
                    stroke="#4F46E5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Próximas Tarefas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-gray-700">Lavar a louça - João</span>
                </li>
                <li className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-gray-700">
                    Arrumar o quarto - Maria
                  </span>
                </li>
                <li className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-gray-700">
                    Fazer o dever de casa - Pedro
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">Maria</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-purple-600 font-semibold">
                        150 pontos
                      </span>
                    </div>
                    <span className="text-blue-600 font-semibold">
                      1h 30min
                    </span>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">João</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-purple-600 font-semibold">
                        120 pontos
                      </span>
                    </div>
                    <span className="text-blue-600 font-semibold">
                      1h 15min
                    </span>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">Pedro</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-purple-600 font-semibold">
                        90 pontos
                      </span>
                    </div>
                    <span className="text-blue-600 font-semibold">45min</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md lg:col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Estatísticas Gerais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={[
                    { categoria: 'Limpeza', total: 30 },
                    { categoria: 'Estudos', total: 40 },
                    { categoria: 'Ajuda', total: 20 },
                    { categoria: 'Outros', total: 10 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
