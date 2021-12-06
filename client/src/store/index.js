import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    EDIT_LIST: "EDIT_LIST",
    UPDATE_LIST: "UPDATE_LIST",
    SEARCH: "SEARCH",
    MODE: "MODE"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        editActive: false,
        listMarkedForDeletion: null,
        mode: "home",
        text: ""
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    eidtActive: false,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    editActive: true,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                console.log(store);
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    editActive: false,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    editActive: false,
                    listMarkedForDeletion: payload,
                    mode: store.mode,
                    text: store.text
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    editActive: false,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.list,
                    editActive: payload.edit,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.EDIT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    editActive: true,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text
                });
            }
            case GlobalStoreActionType.UPDATE_LIST: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    editActive:false,
                    listMarkedForDeletion: null,
                    mode: store.mode,
                    text: store.text
                });
            }
            case GlobalStoreActionType.SEARCH: {
                console.log("search");
                return setStore({
                    idNamePairs:store.idNamePairs,
                    currentList:null,
                    editActive:false,
                    listMarkedForDeletion:null,
                    mode: store.mode,
                    text: payload
                });
            }
            case GlobalStoreActionType.MODE: {
                return setStore({
                    idNamePairs:store.idNamePairs,
                    currentList:null,
                    editActive:false,
                    listMarkedForDeletion:null,
                    mode: payload,
                    text: store.text
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.editList = async function (id, newName, newItems) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            top5List.items = newItems;
            store.updateList(top5List);
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        let list=store.currentList;
        list.view++;
        store.updateList2(list);
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        history.push("/home");
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = ""
        let payload = {
            name: newListName,
            items: ["","","","",""],
            ownerEmail: auth.user.email,
            published:{published:false,time:Date()},
            view:0,
            likes:[],
            dislikes:[],
            comment:[],
            author: auth.user.lastName+" "+auth.user.firstName
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            console.log(store.idNamePairs);
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );
            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
        }
        
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            let listOwned=[];
            for(let key in pairsArray){
                let list = pairsArray[key];
                if(auth.loggedIn){
                    if(auth.user.email===list.email||list.published.published){
                        console.log(auth.user.email,list.email,list.published.published)
                        listOwned.push(list);
                    }
                }
                else{
                    if(list.published.published){
                        listOwned.push(list);
                    } 
                }
                
            }
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: listOwned
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }


    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadIdNamePairs();
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id, input) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: {list: top5List,edit: input}
                });
            }
        }
    }
    store.updateList = async function (newList) {
        if(newList.ownerEmail===auth.user.email){
            async function updateList(newList) {
                let response = await api.updateTop5ListById(newList._id, newList);
                if (response.data.success) {
                    async function getListPairs(newList) {
                        let response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            let listOwned=[];
                            for(let key in pairsArray){
                                let list = pairsArray[key];
                                listOwned.push(list);
                            }
                            storeReducer({
                                type: GlobalStoreActionType.UPDATE_LIST,
                                payload: {
                                    idNamePairs: listOwned,
                                    top5List: newList
                                }
                            });
                        }
                    }
                    getListPairs(newList);
                }
            }
            updateList(newList);
        }
        store.loadIdNamePairs();
    }
    store.updateList2 = async function (newList) {
        async function updateList(newList) {
            let response = await api.updateTop5ListById(newList._id, newList);
            if (response.data.success) {
                async function getListPairs(newList) {
                    let response = await api.getTop5ListPairs();
                        if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        let listOwned=[];
                        for(let key in pairsArray){
                            let list = pairsArray[key];
                            listOwned.push(list);
                        }
                        storeReducer({
                            type: GlobalStoreActionType.UPDATE_LIST,
                            payload: {
                                idNamePairs: listOwned,
                                top5List: newList
                            }
                        });
                    }
                }
                getListPairs(newList);
            }
        }
        updateList(newList);
        store.loadIdNamePairs();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
    }
    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.EDIT_LIST,
            payload: null
        });
    }
    store.publish = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let list=response.data.top5List;
            let date = new Date();
            list.published={published:true,time:date.getMonth()+"-"+date.getDate()+", "+date.getFullYear()}
            store.updateList(list);
        }
    }
    store.searchLists = function (payload) {
        storeReducer({
            type: GlobalStoreActionType.SEARCH,
            payload:payload
        });
    }
    store.setMode= function (input){
        storeReducer({
            type: GlobalStoreActionType.MODE,
            payload:input
        });
        console.log(store.mode);
    }
    store.like = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if(top5List.dislikes.includes(auth.user.email)){
                top5List.dislikes.pop(auth.user.email);
                top5List.likes.push(auth.user.email);
            }
            else if(!top5List.likes.includes(auth.user.email)){
                top5List.likes.push(auth.user.email);
            }
            else{
                top5List.likes.pop(auth.user.email);
            }
            store.updateList2(top5List);
        }
    }
    store.dislike = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if(top5List.likes.includes(auth.user.email)){
                top5List.likes.pop(auth.user.email);
                top5List.dislikes.push(auth.user.email);
            }
            else if(!top5List.dislikes.includes(auth.user.email)){
                top5List.dislikes.push(auth.user.email);
            }
            else{
                top5List.dislikes.pop(auth.user.email);
            }
            store.updateList2(top5List);
        }
    }
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };