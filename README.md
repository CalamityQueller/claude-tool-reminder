# Tool Reminder Plugin

## 功能

这个插件会在系统提示中注入工具使用提醒，帮助 Claude 记得在合适的时机使用有用的工具。

## 覆盖的场景

1. **图片展示**：Read 图片后自动用 SendUserFile 展示
2. **代码改动展示**：Edit/Write 后提醒用 show_pane diff
3. **指向代码位置**：提到文件某行时用 show_pane file
4. **读取终端输出**：用户提到终端时用 read_terminal
5. **网络搜索**：不确定时用 WebSearch/WebFetch
6. **查看其他会话**：用户提到其他对话时用 list_sessions
7. **千星图库**：需要素材时用 image_find/image_view
8. **PR/CI 状态**：开 PR 后用 get_status/bind_pr
9. **上下文使用**：对话长时用 get_usage

## 工作原理

通过 `prompt.compose` hook 在系统提示中注入工具使用提醒，在 Claude 思考回复时就能看到这些提示。

## 安装方法

插件已经在开发模式目录中：
```
C:\Users\24918\.claude\dev-mods\0e717406-1c5a-40e6-bbc1-9fcaf3ce6412\tool-reminder\
```

要启用它，需要：
1. 确认插件结构正确（manifest.json 和 hooks/prompt-compose.js）
2. 重启会话或重新加载插件

## 文件结构

```
tool-reminder/
├── .claude-plugin/
│   └── manifest.json          # 插件元数据
├── hooks/
│   └── prompt-compose.js      # 系统提示增强 hook
└── README.md                  # 本文件
```

## 下一步优化方向

1. **自动化执行**：不只提醒，在某些场景直接自动调用工具
2. **动态检测**：根据对话内容动态生成提醒
3. **统计反馈**：记录哪些提醒有效、哪些被忽略
