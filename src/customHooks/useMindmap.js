import {useContext} from 'react';
import {context} from '../context';
import * as mindmapAction from '../context/reducer/mindmap/actionCreator';
import * as nodeStatusAction from '../context/reducer/nodeStatus/actionCreator.js';
import {clearHistory} from '../context/reducer/history/actionCreator';
import md5 from 'md5';
import axios from 'axios';
const useMindmap = () => {
    const {mindmap: {dispatch: mDispatch}, nodeStatus: {dispatch: nDispatch}, history: {dispatch: hDispatch}} = useContext(context);
    return {
        toggleChildren: (node_id, bool) => {
            mDispatch(mindmapAction.toggleChildren(node_id, bool));
        },
        addChild: node_id => {
            const new_node_id = md5('' + Date.now() + Math.random());
            mDispatch(mindmapAction.toggleChildren(node_id, true));
            mDispatch(mindmapAction.addChild(node_id, new_node_id));
            nDispatch(nodeStatusAction.setEdit(new_node_id));
            const new_node = {
                node_id,
                new_node_id,
              };
              axios.post("http://localhost:4000/create", new_node).then(() => alert(`Node Created{$node_id}{$new_node_id}`))
              .catch(err => {
                alert(err);
              });
              
        },
        addSibling: (node_id, parent_id) => {
            const new_node_id = md5('' + Date.now() + Math.random());
            mDispatch(mindmapAction.addSibling(node_id, parent_id, new_node_id));
            nDispatch(nodeStatusAction.setEdit(new_node_id));
            const new_node = {
                node_id,
                parent_id,
                new_node_id,
              };
              axios.post("http://localhost:4000/create", new_node).then(() => alert(`Node Created{$node_id}{$new_node_id}`))
              .catch(err => {
                alert(err);
              });
        },
        moveNode: (node_id, target_id, parent_id, is_sibling) => {
            mDispatch(mindmapAction.moveNode(node_id, target_id, parent_id, is_sibling));
            nDispatch(nodeStatusAction.setSelect(node_id));
            const new_node = {
                node_id,
                target_id,
                parent_id,
                is_sibling,
              };
              axios.post('http://localhost:4000/move', new_node);
        },
        editNode: node_id => {
            nDispatch(nodeStatusAction.setEdit(node_id));
            const new_node = {
                node_id
              };
              alert("EDITNG NODE")
              axios.post('http://localhost:4000/edit', new_node);
        },
        changeText: (node_id, text) => {
            mDispatch(mindmapAction.changeText(node_id, text));
            const new_node = {
                node_id,
               text,
              };
              alert("CHANGING TEXT")
              axios.post('http://localhost:4000/changeText', new_node);
        },
        editNodeInfo:(node_id,info)=>{
            mDispatch(mindmapAction.changeInfo(node_id, info));
            const new_node = {
                node_id,
                info,
              };
              alert("EDITING INFO")
              axios.post('http://localhost:4000/editNodeInfo', new_node);                      
          },
        selectNode: (node_id, select_by_click) => {
            nDispatch(nodeStatusAction.setSelect(node_id, select_by_click));
            alert("SELECTING")
        },
        deleteNode: (node_id, parent_id) => {
            mDispatch(mindmapAction.deleteNode(node_id, parent_id));
            nDispatch(nodeStatusAction.setSelect(parent_id));
            const new_node = {
                node_id,
                parent_id,
              };
              axios.post('http://localhost:4000/delete', new_node);
        },
        clearNodeStatus: () => {
            nDispatch(nodeStatusAction.clearAll());
        },
        setMindmap: (mindmap, is_new_map) => {
            if (is_new_map) {
                hDispatch(clearHistory());
                nDispatch(nodeStatusAction.setSelect(mindmap.id));
            }
            mDispatch(mindmapAction.setMindmap(mindmap));
        },
        expandAll: node_id => {
            mDispatch(mindmapAction.expandAll(node_id));
            nDispatch(nodeStatusAction.setSelect(node_id));
        }
    }
};

export default useMindmap;