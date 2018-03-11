import React from 'react'
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import MenuItem from './MenuItem'


export default function Menu(props){
  const {menu, isOpen, onClickItem, onCloseModal} = props
  const {items} = menu
  const drinks = items.find(i=>i.id===1)
  const appetizers = items.find(i=>i.id===2)
  const beef = items.find(i=>i.id===3)
  const chicken = items.find(i=>i.id===4)
  const pork = items.find(i=>i.id===5)

  const actions = [
    <FlatButton
      label="Close"
      primary={true}
      keyboardFocused={true}
      onClick={()=> onCloseModal()}
    />,
  ];
  

  return <Dialog
    title="Menu"
    actions={actions}
    modal={false}
    open={ isOpen }
    autoScrollBodyContent={true}
    contentStyle={{width: '100%', maxWidth: 'none' }}
    handleMenuItem={ onClickItem }
    onRequestClose={ onCloseModal }>

    <div style={{display: 'flex', justifyContent:'space-evenly'}}>
      <div>
        {chicken && <MenuItem item={ chicken } {...props} />}
        <Divider/>
        {pork && <MenuItem item={ pork } {...props}/>}
        <Divider/>
        {beef && <MenuItem item={ beef } {...props}/>}
      </div>
      <div>
        {drinks && <MenuItem item={ drinks } {...props}/>}
        <Divider/>
        {appetizers && <MenuItem item={ appetizers } {...props}/>}
      </div>
    </div>
  </Dialog>      
  
}