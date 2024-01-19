package com.example.panda.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInquiryHistoryEntity is a Querydsl query type for InquiryHistoryEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInquiryHistoryEntity extends EntityPathBase<InquiryHistoryEntity> {

    private static final long serialVersionUID = -1994964330L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QInquiryHistoryEntity inquiryHistoryEntity = new QInquiryHistoryEntity("inquiryHistoryEntity");

    public final NumberPath<Integer> iid = createNumber("iid", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> inquiry_date = createDateTime("inquiry_date", java.time.LocalDateTime.class);

    public final QUserEntity userEntity;

    public final QWritingEntity writingEntity;

    public QInquiryHistoryEntity(String variable) {
        this(InquiryHistoryEntity.class, forVariable(variable), INITS);
    }

    public QInquiryHistoryEntity(Path<? extends InquiryHistoryEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QInquiryHistoryEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QInquiryHistoryEntity(PathMetadata metadata, PathInits inits) {
        this(InquiryHistoryEntity.class, metadata, inits);
    }

    public QInquiryHistoryEntity(Class<? extends InquiryHistoryEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userEntity = inits.isInitialized("userEntity") ? new QUserEntity(forProperty("userEntity")) : null;
        this.writingEntity = inits.isInitialized("writingEntity") ? new QWritingEntity(forProperty("writingEntity"), inits.get("writingEntity")) : null;
    }

}

