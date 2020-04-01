import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Input, Text, theme } from 'galio-framework';

import Icon from './Icon';
import materialTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

//this button should open the drawer where the user can click a button that lets them draw on the map
const ReportButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Home')}>
    <Icon
      family="MaterialIcons"
      size={20}
      name="report"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);


// const CurrentLocationSearch = ({isWhite, style, navigation}) => (
//   <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('SearchPage')}>
//     <Icon
//       size={16}
//       family="entypo"
//       name="magnifying-glass"
//       color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
//     />
//   </TouchableOpacity>
// );

// const DesiredDestinationSearch = ({isWhite, style, navigation}) => (
//   <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('SearchPage')}>
//     <Icon
//       size={16}
//       family="entypo"
//       name="magnifying-glass"
//       color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
//     />
//   </TouchableOpacity>
// );

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  //this renders whatever is on the top right of the header.
  renderRight = () => {
    const { white, title, navigation } = this.props;

    if (title === 'Title') {
      return [
        <ReportButton key='report-title' navigation={navigation} isWhite={white} />,
        
      ]
    } else if (title === "Home") {
      return [
        <ReportButton key='report-home' navigation={navigation} isWhite={white} />,
      ]
    }
  }

  renderCurrentLoc = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Current Location"
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="direction" family="entypo" />}
      />
    )
  }

  renderDesiredDest = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Desired Destination"
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="direction" family="entypo" />}
      />
    )
  }

  renderGoButton = () => {
    return (
      <Button shadowless capitalize style={styles.goButton} color="info" size="small">
        Go
      </Button>
    )
  }

  renderHeader = () => {
    const { search } = this.props;
    if (search) {
      return (
        <Block center>
          {search ? this.renderCurrentLoc() : null}
          {search ? this.renderDesiredDest() : null}
          {search ? this.renderGoButton() : null}

        </Block>
      )
    }
    return null;
  }

  render() {
    const { back, title, white, transparent, navigation } = this.props;
    // const { routeName } = navigation.state;
    const noShadow = ["Search", "Categories", "Deals", "Pro", "Profile"].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={back}
          title={title}
          style={styles.navbar}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          leftStyle={{ flex: 0.3, paddingTop: 2  }}
          leftIconName={(back ? 'chevron-left' : 'navicon')}
          leftIconColor={white ? theme.COLORS.WHITE : theme.COLORS.ICON}
          titleStyle={[
            styles.title,
            {color: theme.COLORS[white ? 'WHITE' : 'ICON']},
          ]}
          onLeftPress={this.handleLeftPress}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  goButton: {
    height: 40,
    width: 40,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: materialTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
})