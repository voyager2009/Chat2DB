import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './index.less';
import AIImg from '@/assets/img/ai.svg';
import { Checkbox, Dropdown, Input, Popover } from 'antd';
import i18n from '@/i18n/';
import Iconfont from '@/components/Iconfont';
import { WarningOutlined } from '@ant-design/icons';

interface IProps {
  value?: string;
  result?: string;
  tables?: string[];
  selectedTables?: string[];
  onPressEnter: (value: string) => void;
  onSelectTables?: (tables: string[]) => void;
}

function ChatInput(props: IProps) {
  const onPressEnter = (e: any) => {
    if (!e.target.value) {
      return;
    }
    props.onPressEnter && props.onPressEnter(e.target.value);
  };

  const renderSelectTable = () => {
    const { tables, selectedTables, onSelectTables } = props;
    return tables && tables.length ? (
      <div className={styles.aiSelectedTable}>
        <span className={styles.aiSelectedTableTips}>
          {/* <WarningOutlined style={{color: 'yellow'}}/> */}
          {i18n('chat.input.remain.tooltip')}
        </span>
        <Checkbox.Group
          style={{ width: '120px' }}
          options={tables || []}
          value={selectedTables}
          onChange={(v) => {
            onSelectTables && onSelectTables(v);
          }}
        />
      </div>
    ) : (
      <div>暂无表</div>
    );
  };

  const renderSuffix = () => {
    const remainCnt = 10;
    return (
      <div className={styles.suffixBlock}>
        {/* <div className={styles.chatShortcut}> ⌘ + ↵ </div> */}
        <div className={styles.tableSelectBlock}>
          <Popover content={renderSelectTable()} placement="bottom">
            <Iconfont code="&#xe618;" />
          </Popover>
        </div>
        <div className={styles.remainBlock}>{i18n('chat.input.remain', remainCnt)}</div>
      </div>
    );
  };

  return (
    <div className={styles.chatWrapper}>
      <img className={styles.chatAi} src={AIImg} />
      <Input
        defaultValue={props.value}
        bordered={false}
        placeholder={i18n('workspace.ai.input.placeholder')}
        // onKeyUp={onPressEnter}
        onPressEnter={onPressEnter}
        suffix={renderSuffix()}
      />
    </div>
  );
}

export default ChatInput;
