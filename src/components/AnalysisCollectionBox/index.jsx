import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { 
    EuiListGroupItem,
    EuiPage,
    EuiResizableContainer,
    EuiListGroup,
    EuiPanel,
    EuiTitle,
    EuiSpacer,
    EuiText,
    EuiBasicTable,
    EuiButton,
    EuiModal,
    EuiModalHeader,
    EuiModalBody,
    EuiModalFooter,
    EuiModalHeaderTitle,
    EuiButtonEmpty,
    EuiFormRow,
    EuiFieldText
} from '@elastic/eui';
import { getAnalysisCollection, getACItemByCollectionId, deleteCollectionItemsByIds, deleteCollectionById, insertAnalysisCollection} from '../../utils/DataSource';

class AnalysisCollectionBox extends Component {

    constructor(props){
        super()
        this.initCollectionList()
    }

    state = {
        collectionList : [],
        currentCollectionName: 'First item',
        currentcollectionId: 1,
        currentCollectionItemList : 
            [
                {itemId: 1, patentName : "专利 1", inventor : "李明"},
                {itemId: 2, patentName : "专利 2", inventor : "王刚"},
                {itemId: 3, patentName : "专利 2", inventor : "王刚"},
                {itemId: 4, patentName : "专利 2", inventor : "王刚"},
                {itemId: 5, patentName : "专利 2", inventor : "王刚"},
            ],
        currentCollectionItemCount : 0,
        pageIndex : 0,
        pageSize : 10,
        selectedItems : [],
        isModalVisible : false,
        newCollectionName : "",
    }

    setCurrentCollection(collectionId, collectionName){
        getACItemByCollectionId(collectionId, this.state.pageIndex, this.state.pageSize).then(
            res => {
                this.setState(
                    {   
                        currentCollectionName : collectionName,
                        currentCollectionItemList : res.itemList,
                        currentCollectionItemCount : res.totalItemCount
                    },
                    () => {}
                )
            }
        ) 
    }

    setPageIndex(pageIndex){
        this.setState({
            pageIndex : pageIndex
        })
    }

    setPageSize(pageSize){
        this.setState({
            pageSize : pageSize
        })
    }

    onTableChange = ({ page = {} }) => {
        const { index: pageIndex, size: pageSize } = page;
        this.setPageIndex(pageIndex);
        this.setPageSize(pageSize);
        getACItemByCollectionId(this.state.currentcollectionId, pageIndex, pageSize).then(
            res => {
                this.setState(
                    { 
                        currentCollectionItemList : res.itemList,
                        currentCollectionItemCount : res.totalItemCount,
                        pageIndex : pageIndex,
                        pageSize : pageSize
                    },
                    () => {}
                )
            }
        ) 
        
    };

    setSelectedItems(items){
        this.setState({
            selectedItems : items
        }, () => {})
    }

    initCollectionList(){
        getAnalysisCollection().then(
            res => {
                this.setState(
                    {
                        collectionList : res
                    },
                    () => {
                        this.setCurrentCollection(this.state.collectionList[0].collection_id, this.state.collectionList[0].name)
                    }
                )
            }
        )
    }

    deleteCollection(collectionId){
        deleteCollectionById(collectionId).then(
            res => {
                this.initCollectionList()
            }
        )
    }

    deleteSelectedItems(){
        let ids = this.state.selectedItems.map(
            (item, index) => {return item.itemId}
        )
        deleteCollectionItemsByIds(ids).then(
            res => {
                this.setCurrentCollection(this.state.currentcollectionId, this.state.currentCollectionName)
            }
        )
        
    }

    closeModal(){
        this.setState({
            isModalVisible : false
        })
    }

    openModal(){
        this.setState({
            isModalVisible : true
        })
    }
    render() {

        const collections = this.state.collectionList.map((collection, index) => (
            <EuiListGroupItem
                key={index}
                onClick={() => {this.setCurrentCollection(collection.collection_id, collection.name)}}
                label={collection.name}
                size="m"
                extraAction={{
                    color: 'text',
                    onClick: () => {this.deleteCollection(collection.collection_id)},
                    iconType: 'trash',
                    iconSize: 's',
                    alwaysShow: false
                  }}
            />
        ));

        const columns = [
            {
                field: 'patentName',
                name: '专利名称',
                truncateText: false
            },
            {
                field: 'inventor',
                name: '发明人',
                truncateText: false
            }
        ]

        const pagination = {
            pageIndex : this.state.pageIndex,
            pageSize : this.state.pageSize,
            totalItemCount : this.state.currentCollectionItemCount,
            pageSizeOptions: [this.state.pageSize],
        };  

        const onSelectionChange = (selectedItems) => {
            this.setSelectedItems(selectedItems);
        };        

        const selection = {
            selectable: (item) => true,
            selectableMessage: (selectable) =>
                !selectable ? 'User is currently offline' : undefined,
            onSelectionChange: onSelectionChange,
            initialSelected: []
        };


        const renderDeleteButton = () => {
            if (this.state.selectedItems.length === 0) {
                return;
            }
            return (
                <div>
                    <EuiButton color="danger" iconType="trash" onClick={() => {this.deleteSelectedItems()}}  >
                        Delete {this.state.selectedItems.length} Users
                    </EuiButton>
                    <EuiSpacer/>
                </div>
                
                
            );
        };

        const deleteButton = renderDeleteButton();

        let modal;

        if (this.state.isModalVisible) {
            modal = (
                <EuiModal onClose={() => {this.closeModal()}}>
                <EuiModalHeader>
                    <EuiModalHeaderTitle>
                        <h1>新建待分析集</h1>
                    </EuiModalHeaderTitle>
                </EuiModalHeader>
        
                <EuiModalBody>
                    <EuiFormRow label="请输入新建待分析集合名">
                        <EuiFieldText
                            placeholder="Placeholder text"
                            value={this.state.newCollectionName}
                            onChange={(e) => {
                                    this.setState({
                                        newCollectionName : e.target.value
                                    }, () => {})
                            }}
                            aria-label="Use aria labels when no actual label is in use"
                        />
                    </EuiFormRow>
                </EuiModalBody>
        
                <EuiModalFooter>
                    <EuiButtonEmpty onClick={() => {this.closeModal()}}>Cancel</EuiButtonEmpty>
        
                    <EuiButton 
                        type="submit" 
                        onClick={
                            () => {
                                insertAnalysisCollection(this.state.newCollectionName).then(
                                    (res) => {
                                        this.initCollectionList()
                                        this.closeModal()
                                        
                                    }
                                )
                               
                            }
                        } 
                        fill>
                     Save
                    </EuiButton>
                </EuiModalFooter>
                </EuiModal>
            );
        }

        return (
            <div style={{display: 'flex', flexDirection: 'column', width : '90%', height : '55%', margin: '0 auto'}}>
                <EuiPanel>
                        <EuiResizableContainer style={{ height: '100%' }}>
                            {(EuiResizablePanel, EuiResizableButton) => (
                                <>
                                <EuiResizablePanel
                                    mode="collapsible"
                                    initialSize={20}
                                    minSize="10%"
                                >
                                    <EuiPanel style={{ minHeight: '100%' }}> 
                                        <EuiTitle size="s">
                                            <p>待分析专利集</p>
                                        </EuiTitle>
                                        <EuiSpacer/>
                                        <EuiListGroup flush> {collections}</EuiListGroup>
                                        <EuiSpacer/>
                                        <EuiButton onClick={() => {this.openModal()}}>
                                            + 新建待分析集合
                                        </EuiButton>
                                    </EuiPanel>
                                </EuiResizablePanel>
                                <EuiResizableButton />
                                <EuiResizablePanel mode="main" initialSize={80} minSize="50px">
                                    <EuiPanel paddingSize="l" style={{ minHeight: '100%' }}>
                                        <EuiTitle size="s">
                                            <p>{this.state.currentCollectionName}</p>
                                        </EuiTitle>
                                        <EuiSpacer />
                                        {deleteButton}
                                        <EuiBasicTable
                                            tableCaption="Demo of EuiBasicTable"
                                            items={this.state.currentCollectionItemList}
                                            rowHeader="patentName"
                                            itemId="itemId"
                                            columns={columns}
                                            pagination={pagination}
                                            onChange={this.onTableChange}
                                            isSelectable={true}
                                            selection={selection}
                                        />
                                    </EuiPanel>
                                </EuiResizablePanel>
                                </>
                            )}
                        </EuiResizableContainer>
                </EuiPanel>
                {modal}
            </div>
        )
    }
}

export default withRouter(AnalysisCollectionBox)