import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    // height: 450,
    overflowY: 'auto',
  },
};


export default function TablePicker({tables, carts, isOpen, onClickItem, onCloseModal}){
  const actions = [
    <FlatButton
      label="Close"
      primary={true}
      keyboardFocused={true}
      onClick={()=> onCloseModal()}
    />,
  ];
  
  const mappedTables = tables.items.map((item) => {

    const active = carts.items.find(i=> i.table_id === item.id) 
    return <GridTile
      key={item.id}
      title={item.name}
      actionIcon={
      <IconButton onClick={()=> onClickItem(item, active) }>
        {
          active 
          ?
          <Star color="rgb(0, 188, 212)" />
          :
          <StarBorder color="rgb(0, 188, 212)" />
        }
      </IconButton>
      }
    >
    </GridTile>
  })

  return <Dialog
    title="Choose Table"
    actions={actions}
    modal={false}
    open={ isOpen }
    autoScrollBodyContent={true}
    contentStyle={{width: '100%', maxWidth: 'none' }}
    onRequestClose={ onCloseModal }>

      <GridList
        cols={3}
        cellHeight={180}
        style={styles.gridList}
      >
        {mappedTables}
      </GridList>
    </Dialog>

}