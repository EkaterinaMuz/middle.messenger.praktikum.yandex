import store from "../../../store/Store";


export function getSocket({userId, chatId, token}: {userId: string, chatId: number, token: string}) {
    const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);


    socket.addEventListener('open', () => {
        console.log('Соединение установлено');

       socket.send(JSON.stringify({
            content: '0',
            type: 'get old',
        }));
    });

    socket.addEventListener('close', event => {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения');
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });


    socket.addEventListener('message', event => {
        store.set('messages', JSON.parse(event.data));
    });

    socket.addEventListener('error',( event: Event) => {
        if (event instanceof ErrorEvent) {
            console.log('Ошибка', event.message);
        } else {
            console.error('Непредвиденная ошибка WebSocket');
        }
    });

    return socket;

}
