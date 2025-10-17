import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { useApp } from './AppContext';
import { DateWithLunar } from './DateWithLunar';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Camera,
  Mic,
  FileText,
  MapPin,
  Edit,
  Trash2,
  Download
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Journal() {
  const { user, journalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry, language } = useApp();
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterPlot, setFilterPlot] = useState('all');
  const [editingEntry, setEditingEntry] = useState<string | null>(null);

  const [newEntry, setNewEntry] = useState({
    plotId: '',
    type: '',
    title: '',
    content: '',
    photos: [] as string[],
    audioNote: ''
  });

  const texts = {
    EN: {
      journal: 'Farmer\'s Journal',
      description: 'Record your farming activities, observations, and insights',
      addEntry: 'Add Entry',
      search: 'Search entries...',
      filter: 'Filter',
      allTypes: 'All Types',
      allPlots: 'All Plots',
      entryTitle: 'Entry Title',
      selectPlot: 'Select Plot',
      selectType: 'Select Type',
      content: 'Content',
      photos: 'Photos',
      audioNote: 'Audio Note',
      save: 'Save Entry',
      cancel: 'Cancel',
      export: 'Export',
      noEntries: 'No journal entries yet',
      addFirstEntry: 'Add your first entry to start tracking your farming activities',
      planting: 'Planting',
      weeding: 'Weeding',
      irrigation: 'Irrigation',
      fertilizer: 'Fertilizer',
      pest: 'Pest Control',
      harvest: 'Harvest',
      storage: 'Storage',
      other: 'Other',
      addPhotos: 'Add Photos',
      recordAudio: 'Record Audio',
      template: 'Use Template',
      recentEntries: 'Recent Entries',
      searchResults: 'Search Results',
      edit: 'Edit',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete this entry?',
      entries: 'entries',
      requiredFields: 'Please fill in all required fields',
      entryAdded: 'Journal entry added successfully!',
      plantingTitle: 'Planting Activity',
      plantingTemplate: 'Today I planted [rice variety] in [plot name]. Weather conditions: [weather]. Seed rate: [rate]. Expected germination: [date].',
      weedingTitle: 'Weeding Activity',
      weedingTemplate: 'Completed weeding in [plot name]. Method used: [manual/chemical]. Areas covered: [description]. Next weeding scheduled: [date].',
      fertilizerTitle: 'Fertilizer Application',
      fertilizerTemplate: 'Applied [fertilizer type] to [plot name]. Rate: [amount per hectare]. Growth stage: [stage]. Expected results: [description].',
      irrigationTitle: 'Irrigation Management',
      irrigationTemplate: 'Irrigation status for [plot name]. Water level: [level]. Duration: [hours]. Next irrigation: [date].',
      pestTitle: 'Pest Control',
      pestTemplate: 'Pest observation in [plot name]. Pest type: [pest name]. Severity: [low/medium/high]. Treatment applied: [treatment]. Follow-up date: [date].'
    },
    VI: {
      journal: 'Nhật Ký Nông Dân',
      description: 'Ghi lại các hoạt động, quan sát và hiểu biết về nông nghiệp',
      addEntry: 'Thêm Nhật Ký',
      search: 'Tìm kiếm nhật ký...',
      filter: 'Lọc',
      allTypes: 'Tất Cả Loại',
      allPlots: 'Tất Cả Lô Đất',
      entryTitle: 'Tiêu Đề Nhật Ký',
      selectPlot: 'Chọn Lô Đất',
      selectType: 'Chọn Loại',
      content: 'Nội Dung',
      photos: 'Hình Ảnh',
      audioNote: 'Ghi Âm',
      save: 'Lưu Nhật Ký',
      cancel: 'Hủy',
      export: 'Xuất File',
      noEntries: 'Chưa có nhật ký nào',
      addFirstEntry: 'Thêm nhật ký đầu tiên để bắt đầu theo dõi hoạt động nông nghiệp',
      planting: 'Trồng Trọt',
      weeding: 'Làm Cỏ',
      irrigation: 'Tưới Nước',
      fertilizer: 'Bón Phân',
      pest: 'Phòng Trừ Sâu Bệnh',
      harvest: 'Thu Hoạch',
      storage: 'Bảo Quản',
      other: 'Khác',
      addPhotos: 'Thêm Hình Ảnh',
      recordAudio: 'Ghi Âm',
      template: 'Dùng Mẫu',
      recentEntries: 'Nhật Ký Gần Đây',
      searchResults: 'Kết Quả Tìm Kiếm',
      edit: 'Chỉnh Sửa',
      delete: 'Xóa',
      confirmDelete: 'Bạn có chắc chắn muốn xóa nhật ký này?',
      entries: 'nhật ký',
      requiredFields: 'Vui lòng điền đầy đủ thông tin',
      entryAdded: 'Đã thêm nhật ký thành công!',
      plantingTitle: 'Hoạt Động Trồng Trọt',
      plantingTemplate: 'Hôm nay tôi trồng [giống lúa] tại [tên lô đất]. Điều kiện thời tiết: [thời tiết]. Tỷ lệ gieo: [tỷ lệ]. Dự kiến nảy mầm: [ngày].',
      weedingTitle: 'Hoạt Động Làm Cỏ',
      weedingTemplate: 'Hoàn thành làm cỏ tại [tên lô đất]. Phương pháp: [thủ công/hóa học]. Khu vực: [mô tả]. Làm cỏ tiếp theo: [ngày].',
      fertilizerTitle: 'Bón Phân',
      fertilizerTemplate: 'Đã bón [loại phân] cho [tên lô đất]. Liều lượng: [lượng trên héc-ta]. Giai đoạn sinh trưởng: [giai đoạn]. Kết quả mong đợi: [mô tả].',
      irrigationTitle: 'Quản Lý Tưới Nước',
      irrigationTemplate: 'Tình trạng tưới cho [tên lô đất]. Mức nước: [mức]. Thời gian: [giờ]. Tưới tiếp theo: [ngày].',
      pestTitle: 'Phòng Trừ Sâu Bệnh',
      pestTemplate: 'Quan sát sâu bệnh tại [tên lô đất]. Loại sâu: [tên sâu]. Mức độ: [thấp/trung bình/cao]. Biện pháp: [điều trị]. Theo dõi: [ngày].'
    }
  };

  const t = texts[language];

  const entryTypes = [
    { value: 'planting', label: t.planting },
    { value: 'weeding', label: t.weeding },
    { value: 'irrigation', label: t.irrigation },
    { value: 'fertilizer', label: t.fertilizer },
    { value: 'pest', label: t.pest },
    { value: 'harvest', label: t.harvest },
    { value: 'storage', label: t.storage },
    { value: 'other', label: t.other }
  ];

  const entryTemplates = {
    planting: {
      title: t.plantingTitle,
      content: t.plantingTemplate
    },
    weeding: {
      title: t.weedingTitle,
      content: t.weedingTemplate
    },
    fertilizer: {
      title: t.fertilizerTitle,
      content: t.fertilizerTemplate
    },
    irrigation: {
      title: t.irrigationTitle,
      content: t.irrigationTemplate
    },
    pest: {
      title: t.pestTitle,
      content: t.pestTemplate
    }
  };

  const allPlots = user?.farms.flatMap(farm => farm.plots) || [];

  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || entry.type === filterType;
    const matchesPlot = filterPlot === 'all' || entry.plotId === filterPlot;
    
    return matchesSearch && matchesType && matchesPlot;
  });

  const handleAddEntry = () => {
    if (!newEntry.plotId || !newEntry.type || !newEntry.title || !newEntry.content) {
      toast.error(t.requiredFields);
      return;
    }

    addJournalEntry({
      ...newEntry,
      date: new Date().toISOString()
    });

    setNewEntry({
      plotId: '',
      type: '',
      title: '',
      content: '',
      photos: [],
      audioNote: ''
    });
    setShowAddEntry(false);
    toast.success(t.entryAdded);
  };

  const handleUseTemplate = (type: string) => {
    const template = entryTemplates[type as keyof typeof entryTemplates];
    if (template) {
      setNewEntry({
        ...newEntry,
        type,
        title: template.title,
        content: template.content
      });
    }
  };

  const handleEditEntry = (entry: any) => {
    setNewEntry({
      plotId: entry.plotId,
      type: entry.type,
      title: entry.title,
      content: entry.content,
      photos: entry.photos || [],
      audioNote: entry.audioNote || ''
    });
    setEditingEntry(entry.id);
    setShowAddEntry(true);
  };

  const handleSaveEdit = () => {
    if (!newEntry.plotId || !newEntry.type || !newEntry.title || !newEntry.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingEntry) {
      updateJournalEntry(editingEntry, newEntry);
      toast.success(language === 'EN' ? 'Entry updated successfully!' : 'Đã cập nhật nhật ký thành công!');
    } else {
      addJournalEntry({
        ...newEntry,
        date: new Date().toISOString()
      });
      toast.success(language === 'EN' ? 'Journal entry added successfully!' : 'Đã thêm nhật ký thành công!');
    }

    setNewEntry({
      plotId: '',
      type: '',
      title: '',
      content: '',
      photos: [],
      audioNote: ''
    });
    setEditingEntry(null);
    setShowAddEntry(false);
  };

  const handleCancelEdit = () => {
    setNewEntry({
      plotId: '',
      type: '',
      title: '',
      content: '',
      photos: [],
      audioNote: ''
    });
    setEditingEntry(null);
    setShowAddEntry(false);
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm(t.confirmDelete)) {
      deleteJournalEntry(id);
      toast.success(language === 'EN' ? 'Entry deleted successfully' : 'Đã xóa nhật ký thành công');
    }
  };

  const getPlotName = (plotId: string) => {
    const plot = allPlots.find(p => p.id === plotId);
    return plot ? plot.name : 'Unknown Plot';
  };

  const getTypeLabel = (type: string) => {
    const typeObj = entryTypes.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Fully Responsive Container */}
      <div 
        className="mx-auto"
        style={{
          width: '100%',
          maxWidth: '1280px',
          padding: 'clamp(16px, 4vw, 32px) clamp(16px, 4vw, 32px) clamp(80px, 20vw, 32px)'
        }}
      >
        {/* Journal Header - Fully Responsive */}
        <div style={{ marginBottom: 'clamp(24px, 6vw, 32px)' }}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-responsive">
            {/* Title Section */}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.journal}</h1>
              <p className="text-gray-600">{t.description}</p>
            </div>
            
            {/* Action Buttons - Fully Responsive */}
            <div 
              className="flex flex-col sm:flex-row gap-responsive-sm"
              style={{ flexShrink: 0 }}
            >
              <Button 
                variant="outline"
                className="btn-touch-responsive w-full sm:w-auto"
              >
                <Download className="icon-responsive-sm mr-2" />
                <span className="text-responsive-base">{t.export}</span>
              </Button>
              <Button 
                onClick={() => setShowAddEntry(true)}
                className="btn-touch-responsive w-full sm:w-auto"
              >
                <Plus className="icon-responsive-sm mr-2" />
                <span className="text-responsive-base">{t.addEntry}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters - Fully Responsive */}
        <Card style={{ 
          marginBottom: 'clamp(20px, 5vw, 26px)',
          borderRadius: 'clamp(10px, 2.5vw, 14px)'
        }}>
          <CardContent style={{ padding: 'clamp(14px, 3.5vw, 20px)' }}>
            <div className="flex flex-col lg:flex-row" style={{ gap: 'clamp(10px, 2.5vw, 14px)' }}>
              {/* Search Input */}
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <Search 
                    className="absolute text-gray-400" 
                    style={{
                      left: 'clamp(10px, 2.5vw, 12px)',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 'clamp(16px, 4vw, 18px)',
                      height: 'clamp(16px, 4vw, 18px)'
                    }}
                  />
                  <Input
                    placeholder={t.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="farmer-input"
                    style={{ paddingLeft: 'clamp(36px, 9vw, 42px)' }}
                  />
                </div>
              </div>
              
              {/* Filter Dropdowns - Responsive Stack */}
              <div className="flex flex-col sm:flex-row" style={{ gap: 'clamp(8px, 2vw, 10px)' }}>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger 
                    className="farmer-input w-full sm:w-auto"
                    style={{ minWidth: 'clamp(140px, 35vw, 180px)' }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.allTypes}</SelectItem>
                    {entryTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterPlot} onValueChange={setFilterPlot}>
                  <SelectTrigger 
                    className="farmer-input w-full sm:w-auto"
                    style={{ minWidth: 'clamp(140px, 35vw, 180px)' }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.allPlots}</SelectItem>
                    {allPlots.map(plot => (
                      <SelectItem key={plot.id} value={plot.id}>{plot.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journal Entries - Fully Responsive */}
        {filteredEntries.length === 0 ? (
          <Card style={{ borderRadius: 'clamp(12px, 3vw, 16px)' }}>
            <CardContent 
              className="text-center" 
              style={{ padding: 'clamp(32px, 8vw, 48px)' }}
            >
              <BookOpen 
                className="text-gray-400 mx-auto" 
                style={{ 
                  width: 'clamp(48px, 12vw, 64px)',
                  height: 'clamp(48px, 12vw, 64px)',
                  marginBottom: 'clamp(12px, 3vw, 16px)'
                }}
              />
              <h3 className="heading-sm text-gray-900 mb-2">
                {journalEntries.length === 0 ? t.noEntries : 'No matching entries'}
              </h3>
              <p className="text-responsive-base text-gray-600" style={{ marginBottom: 'clamp(20px, 5vw, 24px)' }}>
                {journalEntries.length === 0 ? t.addFirstEntry : 'Try adjusting your search or filters'}
              </p>
              {journalEntries.length === 0 && (
                <Button onClick={() => setShowAddEntry(true)} className="farmer-button">
                  <Plus className="icon-responsive-sm mr-2" />
                  <span className="text-responsive-base">{t.addEntry}</span>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'clamp(14px, 3.5vw, 18px)' 
          }}>
            {/* Results Header */}
            <h2 className="heading-md text-gray-900" style={{ marginBottom: 'clamp(4px, 1vw, 6px)' }}>
              {searchTerm ? t.searchResults : t.recentEntries}
            </h2>
            
            {/* Entry Cards */}
            {filteredEntries.map(entry => (
              <Card 
                key={entry.id} 
                className="hover:shadow-md transition-shadow"
                style={{ borderRadius: 'clamp(10px, 2.5vw, 14px)' }}
              >
                <CardHeader style={{ 
                  padding: 'clamp(14px, 3.5vw, 18px) clamp(14px, 3.5vw, 18px) 0'
                }}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start" style={{ gap: 'clamp(8px, 2vw, 10px)' }}>
                    <div className="flex-1 min-w-0">
                      {/* Entry Title */}
                      <CardTitle 
                        className="flex items-start" 
                        style={{ 
                          marginBottom: 'clamp(4px, 1vw, 6px)',
                          gap: 'clamp(6px, 1.5vw, 8px)'
                        }}
                      >
                        <FileText 
                          className="flex-shrink-0 mt-1" 
                          style={{ 
                            width: 'clamp(18px, 4.5vw, 20px)',
                            height: 'clamp(18px, 4.5vw, 20px)'
                          }}
                        />
                        <span className="text-responsive-lg break-words">{entry.title}</span>
                      </CardTitle>
                      
                      {/* Metadata Row - Compact Responsive */}
                      <div 
                        className="flex flex-wrap items-center"
                        style={{ gap: 'clamp(10px, 2.5vw, 14px)' }}
                      >
                        {/* Date with Lunar Calendar */}
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <Calendar 
                            className="flex-shrink-0 text-gray-400" 
                            style={{ 
                              width: 'clamp(14px, 3.5vw, 16px)',
                              height: 'clamp(14px, 3.5vw, 16px)'
                            }}
                          />
                          <DateWithLunar 
                            date={entry.date} 
                            className="text-responsive-sm"
                          />
                        </span>
                        
                        {/* Location */}
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <MapPin 
                            className="flex-shrink-0 text-gray-400" 
                            style={{ 
                              width: 'clamp(14px, 3.5vw, 16px)',
                              height: 'clamp(14px, 3.5vw, 16px)'
                            }}
                          />
                          <span className="text-responsive-sm truncate max-w-[150px] sm:max-w-none">
                            {getPlotName(entry.plotId)}
                          </span>
                        </span>
                        
                        {/* Type Badge */}
                        <Badge 
                          variant="secondary"
                          style={{
                            fontSize: 'clamp(11px, 2.5vw, 12px)',
                            padding: 'clamp(3px, 0.75vw, 4px) clamp(8px, 2vw, 10px)',
                            borderRadius: 'clamp(10px, 2.5vw, 12px)'
                          }}
                        >
                          {getTypeLabel(entry.type)}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Action Buttons - Compact Responsive */}
                    <div 
                      className="flex flex-shrink-0"
                      style={{ 
                        alignSelf: 'flex-start',
                        gap: 'clamp(2px, 0.5vw, 4px)',
                        marginTop: '-2px'
                      }}
                    >
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditEntry(entry)}
                        style={{
                          minHeight: 'clamp(36px, 9vw, 40px)',
                          minWidth: 'clamp(36px, 9vw, 40px)',
                          padding: 'clamp(6px, 1.5vw, 8px)'
                        }}
                      >
                        <Edit style={{ 
                          width: 'clamp(16px, 4vw, 18px)',
                          height: 'clamp(16px, 4vw, 18px)' 
                        }} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteEntry(entry.id)}
                        style={{
                          minHeight: 'clamp(36px, 9vw, 40px)',
                          minWidth: 'clamp(36px, 9vw, 40px)',
                          padding: 'clamp(6px, 1.5vw, 8px)'
                        }}
                      >
                        <Trash2 
                          className="text-red-500" 
                          style={{ 
                            width: 'clamp(16px, 4vw, 18px)',
                            height: 'clamp(16px, 4vw, 18px)'
                          }}
                        />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent style={{ 
                  padding: '0 clamp(14px, 3.5vw, 18px) clamp(14px, 3.5vw, 18px)',
                  paddingTop: 'clamp(8px, 2vw, 12px)'
                }}>
                  <p className="text-responsive-base text-gray-700 whitespace-pre-wrap break-words">
                    {entry.content}
                  </p>
                  {entry.photos.length > 0 && (
                    <div 
                      className="flex items-center text-gray-500"
                      style={{ 
                        marginTop: 'clamp(10px, 2.5vw, 12px)',
                        gap: 'clamp(4px, 1vw, 6px)'
                      }}
                    >
                      <Camera style={{ 
                        width: 'clamp(14px, 3.5vw, 16px)',
                        height: 'clamp(14px, 3.5vw, 16px)'
                      }} />
                      <span className="text-responsive-sm">{entry.photos.length} photo(s)</span>
                    </div>
                  )}
                  {entry.audioNote && (
                    <div 
                      className="flex items-center text-gray-500"
                      style={{ 
                        marginTop: 'clamp(6px, 1.5vw, 8px)',
                        gap: 'clamp(4px, 1vw, 6px)'
                      }}
                    >
                      <Mic style={{ 
                        width: 'clamp(14px, 3.5vw, 16px)',
                        height: 'clamp(14px, 3.5vw, 16px)'
                      }} />
                      <span className="text-responsive-sm">Audio note available</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add Entry Modal - Fully Responsive */}
        {showAddEntry && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            style={{ padding: 'clamp(12px, 3vw, 16px)' }}
          >
            <Card 
              className="w-full max-h-[90vh] overflow-y-auto"
              style={{ 
                maxWidth: 'clamp(320px, 90vw, 700px)',
                borderRadius: 'clamp(12px, 3vw, 16px)'
              }}
            >
              <CardHeader style={{ padding: 'clamp(16px, 4vw, 24px)' }}>
                <CardTitle className="heading-md">
                  {editingEntry ? (language === 'EN' ? 'Edit Entry' : 'Chỉnh Sửa Nhật Ký') : t.addEntry}
                </CardTitle>
              </CardHeader>
              <CardContent 
                style={{ 
                  padding: '0 clamp(16px, 4vw, 24px) clamp(16px, 4vw, 24px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(16px, 4vw, 20px)'
                }}
              >
                {/* Plot and Type Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-responsive">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.5vw, 8px)' }}>
                    <Label htmlFor="entry-plot" className="text-responsive-base">{t.selectPlot}</Label>
                    <Select value={newEntry.plotId} onValueChange={(value) => setNewEntry({ ...newEntry, plotId: value })}>
                      <SelectTrigger className="farmer-input">
                        <SelectValue placeholder={t.selectPlot} />
                      </SelectTrigger>
                      <SelectContent>
                        {allPlots.map(plot => (
                          <SelectItem key={plot.id} value={plot.id}>{plot.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.5vw, 8px)' }}>
                    <Label htmlFor="entry-type" className="text-responsive-base">{t.selectType}</Label>
                    <Select value={newEntry.type} onValueChange={(value) => setNewEntry({ ...newEntry, type: value })}>
                      <SelectTrigger className="farmer-input">
                        <SelectValue placeholder={t.selectType} />
                      </SelectTrigger>
                      <SelectContent>
                        {entryTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Template Button */}
                {newEntry.type && (
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleUseTemplate(newEntry.type)}
                      className="btn-touch-responsive"
                    >
                      <FileText className="icon-responsive-sm mr-2" />
                      <span className="text-responsive-sm">{t.template}</span>
                    </Button>
                  </div>
                )}

                {/* Entry Title */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.5vw, 8px)' }}>
                  <Label htmlFor="entry-title" className="text-responsive-base">{t.entryTitle}</Label>
                  <Input
                    id="entry-title"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    placeholder="Brief description of the activity"
                    className="farmer-input"
                  />
                </div>

                {/* Content Textarea */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.5vw, 8px)' }}>
                  <Label htmlFor="entry-content" className="text-responsive-base">{t.content}</Label>
                  <Textarea
                    id="entry-content"
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    placeholder="Detailed description of what you did, observed, or learned..."
                    rows={6}
                    className="farmer-input"
                  />
                </div>

                {/* Media Buttons */}
                <div className="flex flex-col sm:flex-row gap-responsive-sm">
                  <Button variant="outline" className="btn-touch-responsive">
                    <Camera className="icon-responsive-sm mr-2" />
                    <span className="text-responsive-base">{t.addPhotos}</span>
                  </Button>
                  <Button variant="outline" className="btn-touch-responsive">
                    <Mic className="icon-responsive-sm mr-2" />
                    <span className="text-responsive-base">{t.recordAudio}</span>
                  </Button>
                </div>

                {/* Action Buttons */}
                <div 
                  className="flex flex-col sm:flex-row gap-responsive-sm" 
                  style={{ paddingTop: 'clamp(8px, 2vw, 12px)' }}
                >
                  <Button onClick={handleSaveEdit} className="farmer-button flex-1">
                    {editingEntry 
                      ? (language === 'EN' ? 'Update' : 'Cập Nhật')
                      : t.save
                    }
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleCancelEdit}
                    className="farmer-button sm:flex-initial"
                  >
                    {t.cancel}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
