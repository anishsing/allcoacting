import React, { Component } from 'react'
// import MenuIcon from 'images/menu.svg'
import onClickOutside from 'react-onclickoutside'
import "./style.css"
class Menu extends Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }
  handleToggle = () => {
    this.setState({ open: !this.state.open })
    // window.document.addEventListener('click', this.close, false)
  }
  close = () => {
    this.setState({ open: false })
    window.document.removeEventListener('click', this.close, false)
  }
  handleClickOutside = ev => {
    this.close()
  }
  componentWillReceiveProps(nextProps) {
    this.close()
  }
  render() {
    const status = this.state.open ? 'open' : 'close'
    const MenuIcon = 'https://cdn0.iconfinder.com/data/icons/very-basic-android-l-lollipop-icon-pack/24/menu2-32.png'
    return (
      <span className='menu-wrapper'>
        <a onClick={this.handleToggle}>
          <img src={MenuIcon} alt='Menu Icon' className='menu-icon' />
        </a>
        <div className={`menu menu-${status}`}>
          {this.props.children}
        </div>
      </span>
    )
  }
}

export default onClickOutside(Menu)
