import React from 'react';
import { Text, View,TouchableOpacity,TextInput,StyleSheet } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import db from '../config';
export default class SearchScreen extends React.Component {
  constructor(props){
    super(props);
this.state={allTransactions:[],lastVisibleTransaction:null,search:""}
  }
  componentDidMount=async()=>{
    const query=await db.collection("transaction").get()
    query.docs.map((doc)=>{this.setState({
      allTransactions:[...this.state.allTransactions,doc.data()]
    })})
  }

fetchMoreTransactions = async()=>{
  var EnterText = text.split("")
  var text = this.state.search.toUpperCase()
    if(EnterText[0].toUpperCase()==="B"){
const transaction = await db.collection("transaction").where("bookId","==",text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
transaction.docs.map((doc)=>{
  this.setState({
    allTransactions:[...this.state.allTransactions,doc.data()],
    lastVisibleTranscaction:doc
  })
})
    }
    if(EnterText[0].toUpperCase()==="S"){
      const transaction = await db.collection("transaction").where("studentId","==",text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      transaction.docs.map((doc)=>{
        this.setState({
          allTransaction:[...this.state.allTransactions,doc.data()],
          lastVisibleTranscaction:doc
        })
      })
          }
    
}
searchTransactions=async(text)=>{
  var EnterText = text.split("")
  var text = text.toUpperCase()
    if(EnterText[0].toUpperCase()==="B"){
const transaction = await db.collection("transaction").where("bookId","==",text).get()
transaction.docs.map((doc)=>{
  this.setState({
    allTransaction:[...this.state.allTransactions,doc.data()],
    lastVisibleTranscaction:doc
  })
})
    }
    if(EnterText[0].toUpperCase()==="S"){
      const transaction = await db.collection("transaction").where("studentId","==",text).get()
      transaction.docs.map((doc)=>{
        this.setState({
          allTransaction:[...this.state.allTransactions,doc.data()],
          lastVisibleTranscaction:doc
        })
      })
          }
    
  
}
  
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <View style={styles.searchBar}>
           <TextInput style={styles.bar}
           placeholder="Enter BookId or StudentID"
           onChangeText ={(text)=>{this.setState({search:text})}}
           
           />
           <TouchableOpacity style={styles.button}
              onPress={()=>{this.searchTransactions(this.state.search)}}>
                <Text>Search</Text>
           </TouchableOpacity>
         </View>
         <FlatList data = {this.state.allTransactions}
         renderItem={({item})=>{
          <View>
          <Text>{"BookId:"+ item.bookId}</Text>
          <Text>{"StudentId:"+ item.studentId}</Text>
          <Text>{"transactionType:"+ item.transactionType}</Text>
         <Text>{"date:"+item.date.toDate()}</Text>
        </View>
         }}>
          keyExtractor={(item,index)=>index.toString()}
          onEndReached = {this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
         </FlatList>
        </View>
        
      );
    }
  }
  const styles = StyleSheet.create({
    bar:{
      height:50,
      width:100,
      borderRadius:5,
      borderColor:"black"
    },
    button:{
      height:50,
      width:90,
      backgroundColor:"yellow",
      borderRadius:5,
      borderColor:"white",
      justifyContent:"center",
      alignSelf:"center"
    }
  })

