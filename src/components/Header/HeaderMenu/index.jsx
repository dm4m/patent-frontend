import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
    EuiPopover,
    EuiButtonEmpty,
    EuiListGroupItem,
    EuiListGroup,
    EuiTitle
  } from '@elastic/eui';


class HeaderMenu extends Component{

    constructor(props){
        super(props)
        this.state = {
          isPopoverOpen : false,
          isOnButton: false,
          isOnPopover: false
        }
      }

    buttonOnMouseOver = () => {
      this.setState({
        isPopoverOpen: true,
        isOnButton: true,
      }, ()=>{
        // console.log("isPopOpen" + this.state.isPopoverOpen)
      });
    };
  
    popOnMouseOver = () => {
      this.setState({
        isPopoverOpen: true,
        isOnPopover: true,
      }, ()=>{
        // console.log("isPopOpen" + this.state.isPopoverOpen)
      });
    };
  
    buttonOnMouseOut = () => {
      this.setState({
        isOnButton : false
      }, ()=>{
        setTimeout(() => {
          if(!this.state.isOnButton && !this.state.isOnPopover){
            this.setState({
              isPopoverOpen : false
            },()=>{
              // console.log("isPopOpen" + this.state.isPopoverOpen)
            });
          }
        },500)
      }); 
    };
  
    popOnMouseOut = () => {
      this.setState({
        isOnPopover : false
      }, ()=>{
        setTimeout(() => {
          if(!this.state.isOnButton && !this.state.isOnPopover){
            this.setState({
              isPopoverOpen : false
            },()=>{
              // console.log("isPopOpen" + this.state.isPopoverOpen)
            });
          }
        },500)
      }); 
    };

    render(){
        
        const {title, titlePath, items} = this.props.menuValue
        
        

        const button = (
            <EuiButtonEmpty
              color='text'
              onClick={() => {this.props.history.push({pathname:titlePath})}}
              onMouseOver={() => this.buttonOnMouseOver()}
              onMouseOut={() => this.buttonOnMouseOut()}
            >
                {title}
            </EuiButtonEmpty>
          );

        if(items.length == 0){
          return (
            <div>
              {button}
            </div>
          )
        }else{
          return(
            <div>
                <EuiPopover
                    button={button}
                    panelPaddingSize="s"
                    anchorPosition="downLeft"
                    isOpen={this.state.isPopoverOpen}
                >
                <EuiListGroup 
                    onMouseOver={() => this.popOnMouseOver()}
                    onMouseOut={() => this.popOnMouseOut()}>
                    {items.map((item)=>{
                    return (
                        <EuiListGroupItem onClick={() => {this.props.history.push({pathname:item.path})}} label={item.name}/>
                    )
                    })}
                </EuiListGroup>
                </EuiPopover>
            </div>
          )
        }

        
    }
}

export default withRouter(HeaderMenu)