<script lang="ts">
  // for testing only, data will eventually come from the back end
  export let type = 'Lobby'
  export let items = [
    {
      color: 'black',
      player: 'username1',
      rating: 1500,
      time: '1|2',
      timeControl: 'bullet',
      mode: 'rated'
    },
    {
      color: 'white',
      player: 'username2',
      rating: 2080,
      time: '5|3',
      timeControl: 'blitz',
      mode: 'casual'
    }
  ]
</script>

<table>
  <thead>
    <tr>
      <th>Color</th>
      <th>Player</th>
      <th>Rating</th>
      <th>Time</th>
      <th>Mode</th>
    </tr>
  </thead>
  <tbody>
    {#each items as { color, player, rating, time, timeControl, mode } (player)}
      <tr>
        <td>{color}</td>
        <td>{player}</td>
        <td>{rating}</td>
        <td>{time}</td>
        <td>{`${timeControl} - ${mode}`}</td>
      </tr>
    {/each}
  </tbody>
</table>
