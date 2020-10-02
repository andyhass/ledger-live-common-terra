// @flow
import React from "react";
import { Trans } from "react-i18next";
import SafeAreaView from "react-native-safe-area-view";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/dist/AntDesign";
import LText from "../../components/LText";
import colors from "../../colors";

const NotAvailable = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.wrapper}>
        <Icon name={"exclamationcircleo"} color={colors.grey} size={40} />
        <LText secondary style={styles.title}>
          <Trans i18nKey="transfer.swap.notAvailable.title" />
        </LText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },

  wrapper: {
    flexGrow: 1,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 18,
    color: colors.darkBlue,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 8,
  },
});

export default NotAvailable;
