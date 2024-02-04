<script lang="ts">
  import { Column } from './index'
  import { playedBy, createBoard, result } from '../../stores/Game'
  import { userID } from '../../stores/User'
  import { checkIsLegal, checkIsWinner } from '../../utils/utils'
  import { type Position, type MsgPayload, Player, Result } from '../../utils/types'
  import ReconnectingWebSocket from 'reconnecting-websocket'

  // hardcode for now
  const width = 7
  const height = 6
  const board = createBoard(width, height)

  // websocket stuff
  const socket = new ReconnectingWebSocket('ws://127.0.0.1:4000/ws', [], { debug: true, connectionTimeout: 3000 })

  socket.onopen = () => {
    console.log('Successfully connected to ws')
  }

  socket.onclose = () => {
    console.log('Connection close')
  }

  socket.onerror = (error) => {
    console.log('There was an error')
  }

  socket.onmessage = (msg) => {
    let data = JSON.parse(msg.data)
    // update board with oponent's move
    if ($userID && $userID !== data?.userID) board.updatePosition(data.board)
  }

  const sendWSMessage = (msg: MsgPayload) => {
    socket.send(JSON.stringify(msg))
  }

  const positionHandler = (e: CustomEvent<{ position: Position }>): void => {
    const { position } = e.detail
    if (!checkIsLegal(6, position, $board) || $result) return

    // update board before sending WS message, so current player can see the change
    board.updatePosition($board, position, $playedBy)

    if (checkIsWinner(position, $board, 6)) {
      result.update(() => {
        const result = position.player === Player.White ? 1 : 0
        sendWSMessage({
          action: 'game_over',
          userID: $userID!, // only logged in users can start a game
          board: $board,
          result,
        })
        return result
      })
    } else {
      playedBy.update((currentValue) => {
        if (currentValue === Player.White) return Player.Black
        return Player.White
      })

      if ($board.halfMove === width * height) {
        sendWSMessage({
          action: 'game_over',
          userID: $userID!,
          board: $board,
          result: Result.Draw,
        })
        result.update(() => Result.Draw)
      }

      // if we got to this point, no decisive result
      sendWSMessage({
        action: 'move',
        userID: $userID!,
        board: $board,
        result: 1,
      })
    }
  }
</script>

<section class="board">
  {#each $board.grid as column, idx (idx)}
    <Column {column} on:position={positionHandler} />
  {/each}
</section>

<style>
  .board {
    width: 40%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    justify-items: center;

    padding: 1rem;
    border-radius: 2rem;
    background-color: rgb(71, 122, 218);
  }
</style>
