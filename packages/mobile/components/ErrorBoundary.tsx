import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { AlertTriangle, RotateCcw } from 'lucide-react-native';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  level?: 'screen' | 'widget' | 'global';
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[ErrorBoundary:${this.props.level || 'global'}]`, error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      const isWidget = this.props.level === 'widget';

      return (
        <View style={[styles.container, isWidget && styles.widgetContainer]}>
          <AlertTriangle size={isWidget ? 18 : 28} color="#737373" strokeWidth={1.5} />
          <Text style={[styles.title, isWidget && styles.widgetTitle]}>
            something went wrong
          </Text>
          {!isWidget && this.state.error && (
            <ScrollView style={styles.errorScroll} horizontal>
              <Text style={styles.errorText}>
                {this.state.error.message}
              </Text>
            </ScrollView>
          )}
          <Pressable style={styles.retryBtn} onPress={this.handleRetry}>
            <RotateCcw size={14} color="#000" strokeWidth={1.5} />
            <Text style={styles.retryText}>retry</Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  widgetContainer: {
    flex: 0,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  title: {
    fontSize: 14,
    color: '#737373',
    fontFamily: 'JosefinSans',
    textTransform: 'lowercase',
  },
  widgetTitle: {
    fontSize: 12,
  },
  errorScroll: {
    maxHeight: 60,
    maxWidth: '100%',
  },
  errorText: {
    fontSize: 11,
    color: '#999',
    fontFamily: 'Montserrat',
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  retryText: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Montserrat',
    textTransform: 'lowercase',
  },
});
