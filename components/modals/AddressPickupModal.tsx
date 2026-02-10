"use client";

import React from "react"

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Plus, Search } from "lucide-react";

interface AddressPickupModalProps {
  children: React.ReactNode;
}

export default function AddressPickupModal({
  children,
}: AddressPickupModalProps) {
  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    zipCode: "",
    address: "",
    addressDetail: "",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto bg-card text-foreground sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            배송지/픽업매장 관리
          </DialogTitle>
          <DialogDescription className="sr-only">
            배송지를 등록하거나 픽업매장을 선택할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="address">
          <TabsList className="w-full">
            <TabsTrigger value="address" className="flex-1">
              배송지
            </TabsTrigger>
            <TabsTrigger value="pickup" className="flex-1">
              픽업매장
            </TabsTrigger>
          </TabsList>

          {/* Address Tab */}
          <TabsContent value="address" className="mt-4 space-y-4">
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-foreground">수령인</Label>
                <Input
                  placeholder="이름을 입력하세요"
                  value={addressForm.name}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, name: e.target.value })
                  }
                  className="mt-1 h-9 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-foreground">연락처</Label>
                <Input
                  placeholder="010-0000-0000"
                  value={addressForm.phone}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, phone: e.target.value })
                  }
                  className="mt-1 h-9 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-foreground">우편번호</Label>
                <div className="mt-1 flex gap-2">
                  <Input
                    placeholder="우편번호"
                    value={addressForm.zipCode}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        zipCode: e.target.value,
                      })
                    }
                    className="h-9 flex-1 text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 text-xs border-border text-foreground bg-transparent hover:text-accent"
                  >
                    주소 검색
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-xs text-foreground">주소</Label>
                <Input
                  placeholder="기본 주소"
                  value={addressForm.address}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, address: e.target.value })
                  }
                  className="mt-1 h-9 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-foreground">상세 주소</Label>
                <Input
                  placeholder="상세 주소를 입력하세요"
                  value={addressForm.addressDetail}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      addressDetail: e.target.value,
                    })
                  }
                  className="mt-1 h-9 text-sm"
                />
              </div>
            </div>

            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              배송지 저장
            </Button>
          </TabsContent>

          {/* Pickup Tab */}
          <TabsContent value="pickup" className="mt-4 space-y-4">
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-foreground">지역 선택</Label>
                <Select>
                  <SelectTrigger className="mt-1 h-9 text-sm">
                    <SelectValue placeholder="지역을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seoul">서울</SelectItem>
                    <SelectItem value="gyeonggi">경기</SelectItem>
                    <SelectItem value="incheon">인천</SelectItem>
                    <SelectItem value="busan">부산</SelectItem>
                    <SelectItem value="daegu">대구</SelectItem>
                    <SelectItem value="daejeon">대전</SelectItem>
                    <SelectItem value="gwangju">광주</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-foreground">매장 검색</Label>
                <div className="mt-1 flex gap-2">
                  <Input
                    placeholder="매장명을 입력하세요"
                    className="h-9 flex-1 text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 border-border text-foreground bg-transparent hover:text-accent"
                  >
                    <Search className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Search Results Placeholder */}
            <div className="space-y-2">
              {["천원마켓 강남역점", "천원마켓 역삼역점", "천원마켓 선릉역점"].map(
                (store) => (
                  <div
                    key={store}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {store}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          서울특별시 강남구
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-xs border-border text-foreground bg-transparent hover:text-accent"
                    >
                      <Plus className="h-3 w-3" />
                      추가
                    </Button>
                  </div>
                )
              )}
            </div>

            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              픽업매장 추가
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
