import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Botao extends Component {
  constructor(props) {
    super(props);

    let flex = 1;
    let corFundoBtn = '#E0E0E0';
    let corBtn = '#000';
    let txtNegrito = '100';

    if (props.flex) flex = parseInt(props.flex);
    if (props.corFundoBtn) corFundoBtn = props.corFundoBtn;
    if(props.corBtn) corBtn = props.corBtn;
    if(props.negrito === true) txtNegrito = 'bold';

    this.style = StyleSheet.create({
      btn: {
        flex: flex,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#999',
        backgroundColor: corFundoBtn,
      },

      txt: {
        fontSize: 25,
        color: corBtn,
        fontWeight: txtNegrito,
      },
    });
  }

  render() {
    return (
      <TouchableOpacity style={this.style.btn} onPress={this.props.onPress}>
        <Text style={this.style.txt}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {txtResultado: '0'};
    
    let apertouIgual = false;
  }

  cliquei = (num) => {
    const s = this.state;

    try{
      if(num === 'C'){
        s.txtResultado = '0';
      }else if(num === 'DEL'){
        if(this.apertouIgual){
          s.txtResultado = '0';
          this.apertouIgual = false;
        }else{
          s.txtResultado = s.txtResultado.substring(0, (s.txtResultado.length - 1));
        }
      }else if(num === '='){
        for (let i = 0; i < 2; i++) {
          this.apertouIgual = true;
          s.txtResultado = s.txtResultado.replace('x', '*');
        }
        s.txtResultado = eval(s.txtResultado);
      }else{
        this.apertouIgual = false;
        if(s.txtResultado === '0'){
          if(num === '.'){
            s.txtResultado += num;
          }else{
            s.txtResultado = num;
          }
        }else{
          s.txtResultado += num;
        }
      }
    }catch(e){
      s.txtResultado= 'ERRO';
    }
    this.setState(s);
  }

  render() {
    return (
      <View style={container}>
        <View style={viewResultado}>
          <Text style={txtResultado}>{this.state.txtResultado}</Text>
        </View>

        <View style={viewLinha}>
          <Botao title={'C'} flex={2}  onPress={() => {this.cliquei('C')}}/>
          <Botao title={'DEL'}  onPress={ () => {this.cliquei('DEL')}}/>
          <Botao title={'/'} corFundoBtn={'#FF8C29'} corBtn={'#FFF'} negrito={true} onPress={ () => {this.cliquei('/')}}/>
        </View>
        <View style={viewLinha}>
          <Botao title={7}  onPress={ () => {this.cliquei('7')}}/>
          <Botao title={8}  onPress={ () => {this.cliquei('8')}}/>
          <Botao title={9}  onPress={ () => {this.cliquei('9')}}/>
          <Botao title={'x'} corFundoBtn={'#FF8C29'} corBtn={'#FFF'} negrito={true} onPress={ () => {this.cliquei('x')}}/>
        </View>
        <View style={viewLinha}>
          <Botao title={4}  onPress={ () => {this.cliquei('4')}}/>
          <Botao title={5}  onPress={ () => {this.cliquei('5')}}/>
          <Botao title={6}  onPress={ () => {this.cliquei('6')}}/>
          <Botao title={'-'} corFundoBtn={'#FF8C29'} corBtn={'#FFF'} negrito={true} onPress={ () => {this.cliquei('-')}}/>
        </View>
        <View style={viewLinha}>
          <Botao title={1}  onPress={ () => {this.cliquei('1')}}/>
          <Botao title={2}  onPress={ () => {this.cliquei('2')}}/>
          <Botao title={3}  onPress={ () => {this.cliquei('3')}}/>
          <Botao title={'+'} corFundoBtn={'#FF8C29'} corBtn={'#FFF'} negrito={true} onPress={ () => {this.cliquei('+')}}/>
        </View>
        <View style={viewLinha}>
          <Botao title={0} flex={2}  onPress={ () => {this.cliquei('0')}}/>
          <Botao title={'.'}  onPress={ () => {this.cliquei('.')}}/>
          <Botao title={'='} corFundoBtn={'#FF8C29'} corBtn={'#FFF'} negrito={true} onPress={ () => {this.cliquei('=')}}/>
        </View>
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },

  viewResultado: {
    flex: 2,
    backgroundColor: 'black',
    alignItems:'flex-end',
    justifyContent:'flex-end',
  },

  viewLinha: {
    flex: 1,
    flexDirection: 'row',
  },

  txtResultado: {
    fontSize: 70,
    color: '#FFF',
  }

});

const { container, viewResultado, viewLinha, txtResultado } = estilos;
