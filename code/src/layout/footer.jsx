import '../assets/styles/footer.styl'
export default {
  data () {
    return {
      author: 'j190512@163.com'
    }
  },
  render () {
    let styles = {
      userSelect:"text"
    }
    return (
      <footer>
        <span style={styles}>emile : { this.author }</span>
      </footer>
    )
  }
}
