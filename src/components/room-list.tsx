import { data, Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { dayjs } from '@/lib/dayjs'
import { ArrowRight } from 'lucide-react'
import { useRooms } from '@/http/use-rooms'

export function RoomList() {
  const { data, isLoading } = useRooms()

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Salas recentes
        </CardTitle>
        <CardDescription>
          Acesso rápido para as salas criadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        {isLoading && (
          <p className='text-muted-foreground text-sm'>
            Carregando salas...
          </p>
        )}

        { data?.map((room) => {
          return (
            <Link to={`/room/${room.id}`} key={room.id} className='flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50'>
              <div className='flex-1 flex flex-col gap-1'>
                <h3 className='font-medium'>{room.name}</h3>

                <div className='flex items-center gap-2'>
                  <Badge className='text-xs' variant={'secondary'}>
                    {dayjs(room.createdAt).toNow()}
                  </Badge>
                  <Badge className='text-xs' variant={'secondary'}>
                    {room.questionsCount} {room.questionsCount > 1 ? 'perguntas' : 'pergunta'}
                  </Badge>
                </div>
              </div>

              <span className='flex items-center gap-1 text-sm'>
                Entrar
                <ArrowRight className='size-3' />
              </span>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}