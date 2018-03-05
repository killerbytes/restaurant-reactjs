import React from 'react'
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';



export default function Menu({menu, isOpen, onClickItem, onCloseModal}){
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
  
  const MenuItem=({item})=>{
    const mappedProducts = item && item.products.map(item=>{
      return <TableRow key={item.id} displayBorder={false} hoverable={true}> 
        <TableRowColumn style={{whiteSpace: 'normal'}}>{item.name}</TableRowColumn>
        <TableRowColumn style={{width: 70, textAlign: 'right'}}>{item.price}</TableRowColumn>
        <TableRowColumn style={{width: 50, textAlign: 'right'}}><IconButton onClick={ ()=> onClickItem(item) }><ContentAdd /></IconButton></TableRowColumn>
      </TableRow>
    })
    return <div>

      <Subheader>{item.name}</Subheader>
      <Table>
        <TableBody displayRowCheckbox={false}>
          {mappedProducts}
        </TableBody>
      </Table>
    </div>
  }

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
        {chicken && <MenuItem item={ chicken } />}
        <Divider/>
        {pork && <MenuItem item={ pork } />}
        <Divider/>
        {beef && <MenuItem item={ beef } />}
      </div>
      <div>
        {drinks && <MenuItem item={ drinks } />}
        <Divider/>
        {appetizers && <MenuItem item={ appetizers } />}
      </div>
    </div>
  </Dialog>      
  
}